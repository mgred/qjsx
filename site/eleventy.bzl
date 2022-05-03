load("@build_bazel_rules_nodejs//:providers.bzl", "run_node")

def _elventy_impl(ctx):
  tmp_dir = ctx.actions.declare_directory(ctx.attr.name + "_input")
  out_dir = ctx.actions.declare_directory("dist")

  ctx.actions.run_shell(
      inputs = ctx.files.pkg,
      outputs = [tmp_dir],
      command = "mkdir -p {tmp_dir}; tar xvf {pkg} -C {tmp_dir}".format(
          tmp_dir = tmp_dir.path,
          pkg = ctx.files.pkg[0].path,
      )
  )

  run_node(
      ctx = ctx,
      inputs = [tmp_dir],
      outputs = [out_dir],
      arguments = [
        "--input=%s" % tmp_dir.path,
        "--config=%s" % (tmp_dir.path + "/eleventy.js"),
        "--output=%s" % out_dir.path,
      ],
      executable = "eleventy",
  )

  return [DefaultInfo(files = depset([out_dir]))]

eleventy = rule(
    implementation = _elventy_impl,
    attrs = {
        "pkg": attr.label(mandatory=True),
        "eleventy": attr.label(
            default = Label("@npm//@11ty/eleventy/bin:eleventy"),
            executable = True,
            cfg = "exec",
        ),
    },
)
