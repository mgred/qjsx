function configure(config: any) {
  config.addNunjucksFilter("stringify", (value: unknown) =>
    JSON.stringify(value)
  );

  config.addNunjucksGlobal("tagsToUrl", (tags: string[], index: number) =>
    tags.slice(0, index).join("/")
  );

  return {
    templateEngineOverride: "njk",
  };
}

export = configure;
