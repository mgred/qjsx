load("@build_bazel_rules_nodejs//:index.bzl", "js_library", "pkg_npm", "nodejs_test")
load("@npm//@bazel/esbuild:index.bzl", "esbuild")
load("//tools:typescript.bzl", "ts_project")

def ts_package(name):

  package_name = "@quickts/%s" % name

  # ts_project(
  #     name = "%s_ts" % name,
  #     srcs = [":index.ts"],
  #     deps = [
  #         "@npm//@quickts/types",
  #     ],
  # )

  ts_project(
      name = "%s_ts_test" % name,
      srcs = [":test.ts", ":index.ts"],
      tsconfig = "//:tsconfig.test",
      deps = [
          "@npm//@quickts/types",
          "@npm//@types/node",
      ],
  )

  # esbuild(
  #     name = "%s_test_bundle" % name,
  #     entry_point = ":test.ts",
  #     external = ["os", "std"],
  #     platform = "node",
  #     deps = ["%s_ts_test" % name],
  # )

  nodejs_test(
    name = "%s_test" % name,
    entry_point = ":test.js",
    data = [":%s_ts_test" % name],
  )

  js_library(
      name = name,
      package_name = package_name,
      srcs = [":package.json"],
      deps = [":%s_ts" % name],
  )

  pkg_npm(
      name = "%s_npm" % name,
      package_name = package_name,
      srcs = [":package.json"],
      substitutions = {"0.0.0-PLACEHOLDER": "{PACKAGE_VERSION}"},
      deps = [":%s_ts" % name],
  )
