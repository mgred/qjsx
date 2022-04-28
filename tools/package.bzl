load("//tools:typescript.bzl", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library", "pkg_npm", "nodejs_test")
load("@npm//@bazel/jasmine:index.bzl", "jasmine_node_test")

def ts_package(name):

  package_name = "@qjsx/%s" % name
  ts_name = "%s_ts" % name
  ts_test_name = "%s_ts_test" % name

  ts_project(
      name = ts_name,
      srcs = [":index.ts"],
      deps = [
          "@npm//@qjsx/types",
      ],
  )

  ts_project(
      name = ts_test_name,
      srcs = [":test.ts"],
      tsconfig = "//:tsconfig.test",
      composite = True,
      deps = [
          ts_name,
          "@npm//@types/jasmine",
      ]
  )

  jasmine_node_test(
      name = "test",
      srcs = [ts_test_name, ":package.json"],
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
      srcs = [":package.json"],
      deps = [ts_name],
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
      srcs = [":package.json"],
      substitutions = {"0.0.0-PLACEHOLDER": "{PACKAGE_VERSION}"},
      deps = [ts_name, ":LICENSE", ":README.md"],
  )
