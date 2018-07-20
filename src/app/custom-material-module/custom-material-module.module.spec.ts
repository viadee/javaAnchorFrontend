import { CustomMaterialModuleModule } from './custom-material-module.module';

describe('CustomMaterialModuleModule', () => {
  let customMaterialModuleModule: CustomMaterialModuleModule;

  beforeEach(() => {
    customMaterialModuleModule = new CustomMaterialModuleModule();
  });

  it('should create an instance', () => {
    expect(customMaterialModuleModule).toBeTruthy();
  });
});
