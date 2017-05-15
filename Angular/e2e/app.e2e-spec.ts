import { DreamAppPage } from './app.po';

describe('dream-app App', () => {
  let page: DreamAppPage;

  beforeEach(() => {
    page = new DreamAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
