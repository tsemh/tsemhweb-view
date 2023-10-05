export class AppConstants {

  public static get baseServidor(): string  { return "https://tsemhweb-api-production.up.railway.app/tsemhapi" }
  public static get baseLogin(): string { return `${this.baseServidor}/login` }

}
