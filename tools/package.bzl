load("@build_bazel_rules_nodejs//:index.bzl", "js_library", "pkg_npm", "nodejs_test")
load("//tools:typescript.bzl", "ts_project")
load("@npm//jest-cli:index.bzl", "jest_test")
load("@npm//@bazel/jasmine:index.bzl", "jasmine_node_test")

def ts_package(name):

  package_name = "@quickts/%s" % name

  ts_project(
      name = "%s_ts" % name,
      srcs = [":index.ts"],
      deps = [
          "@npm//@quickts/types",
      ],
  )

  ts_project(
      name = "%s_ts_test" % name,
      srcs = [":test.ts"],
      tsconfig = "//:tsconfig.test",
      composite = True,
      deps = [
          "%s_ts" % name,
          "@npm//@types/node",
          "@npm//@types/jasmine",
      ]
  )

  jasmine_node_test(
      name = "test",
      srcs = ["%s_ts_test" % name, ":package.json"],
      deps = ["@npm//c8", "//packages/testing/std:std"],
      templated_args = [
          "--node_options=--es-module-specifier-resolution=node",
      ],
  )

  # ts_project(
  #     name = "%s_ts_test" % name,
  #     srcs = ["test.ts", "index.ts"],
  #     out_dir = "test_out",
  #     tsconfig = "//:tsconfig.test",
  #     composite = True,
  #     source_map = True,
  #     deps = [
  #         "@npm//@quickts/types",
  #         "@npm//@types/node",
  #         "@npm//@types/jest",
  #     ],
  # )

  # jest_test(
  #     name = "test",
  #     data = [
  #         "@npm//ts-node",
  #         "@npm//c8",
  #         ":%s_ts_test" % name,
  #         "//:jest.config.ts",
  #     ],
  #     env = {
  #         "NODE_V8_COVERAGE": "1",
  #     },
  #     args = [
  #         "--coverage",
  #         "--no-cache",
  #         "--no-watchman",
  #         "--ci",
  #         "--colors",
  #     ]
  # )

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
