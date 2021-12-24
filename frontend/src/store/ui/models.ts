export interface TranslationInterface {
  code: string;
  value: string;
}

export interface UIStateInterface {

  pendingHttpRequests: string[];

  allTranslations: TranslationInterface[],
  
  //
  // Forms
  //
  isDirty: boolean,

  routeParamId: string,

  userLangCode: string
}
