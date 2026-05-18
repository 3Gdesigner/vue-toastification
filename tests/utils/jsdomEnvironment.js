// Adapter: jest-environment-jsdom@27 expects config.testEnvironmentOptions at root,
// but jest 28+ passes config = { projectConfig, globalConfig }. This wrapper
// normalises the config so the old environment constructor works with newer jest.
const JSDOMEnv = require("jest-environment-jsdom")
const BaseEnvironment = JSDOMEnv.default ?? JSDOMEnv.TestEnvironment ?? JSDOMEnv

class JsdomEnvironment extends BaseEnvironment {
  constructor(config, context) {
    const projectConfig = config.projectConfig ?? config
    const adapted = {
      ...projectConfig,
      testEnvironmentOptions: projectConfig.testEnvironmentOptions ?? {},
    }
    super(adapted, context)
  }
}

module.exports = JsdomEnvironment
