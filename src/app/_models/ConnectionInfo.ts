export class ConnectionInfo {
  constructor(
    public server: string,
    public modelId: string,
    public frameId: string) {

  }

  public equals(other: ConnectionInfo): boolean {
    return other !== undefined
      && other !== null
      && this.server === other.server
      && this.modelId === other.modelId
      && this.frameId === other.frameId;
  }

}
