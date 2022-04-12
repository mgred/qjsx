load("@npm//@bazel/typescript:index.bzl", _ts_project = "ts_project")

def ts_project(tsconfig = "//:tsconfig.build", **kwargs):
  _ts_project(
      declaration = True,
      tsconfig = tsconfig,
      **kwargs,
  )

