import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

    loadedMatchesCollection: null as string,
    
    //#region DATABASE PROD
    async connect (uri: string): Promise<void> {
        this.uri = uri;
        this.client = await MongoClient.connect(this.uri);
    },
    async disconnect (): Promise<void> {
        if(this.client !== null)
            await this.client.close();
        this.client = null;
    },
    setLoadedMatchesCollection (name: string): void {
        this.loadedMatchesCollection = name;
    },
    getLoadedMatchesCollection (): Collection {
        return this.client.db().collection(this.loadedMatchesCollection);
    },
    //#endregion

    map: (data: any): any => {
        const { _id, ...rest } = data;
        return { ...rest, id: _id.toHexString() };
    },
    mapCollection: (collection: any[]): any[] => {
        return collection.map(c => MongoHelper.map(c));
    }
}