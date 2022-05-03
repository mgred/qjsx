load("//tools:typescript.bzl", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library", "pkg_npm", "nodejs_test")
load("@npm//@bazel/jasmine:index.bzl", "jasmine_node_test")
load("@rules_pkg//pkg:tar.bzl", "pkg_tar")

def qjsx_package(name, srcs = [], specs = [], data = [], package_json = ":package.json"):

  package_name = "@qjsx/%s" % name
  srcs_name = "%s_srcs" % name
  test_name = "%s_test" % name

  lib_deps = [] + data

  if len(srcs) > 0:
    ts_project(
        name = srcs_name,
        srcs = srcs,
        deps = [
            "@npm//@qjsx/types",
        ],
    )

    lib_deps += [srcs_name]

    if len(specs) > 0:
      ts_project(
          name = test_name,
          srcs = specs,
          tsconfig = "//:tsconfig.test",
          composite = True,
          deps = [
              srcs_name,
              "@npm//@types/jasmine",
          ]
      )

      jasmine_node_test(
          name = "test",
          srcs = [test_name, package_json],
          deps = [
              "@npm//c8",
              "//packages/testing/std:std"
          ],
          templated_args = [
              "--node_options=--es-module-specifier-resolution=node",
          ],
      )

  js_library(
      name = name,
      package_name = package_name,
      srcs = [package_json] + lib_deps,
      visibility = ["//visibility:public"],
  )

  native.genrule(
      name = "license",
      outs = ["LICENSE"],
      srcs = ["//:COPYING"],
      cmd = "cp $< $(OUTS)",
  )

  pkg_npm(
      name = "%s_npm" % name,
      package_name = package_name,
      srcs = [package_json],
      substitutions = {"0.0.0-PLACEHOLDER": "{PACKAGE_VERSION}"},
      deps = [":LICENSE", ":README.md"] + lib_deps,
  )

  pkg_tar(
      name = "docs",
      srcs = [":README.md"],
      package_dir = "packages/%s" % name,
      visibility = ["//site:__subpackages__"],
  )
