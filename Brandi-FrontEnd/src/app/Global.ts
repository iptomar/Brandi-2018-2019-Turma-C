export interface ReceivedData {
    error : number,
    message : string,
    res: any
}

export interface ProcessedData {
    message : string,
    data: any
}

export class Global {
    public static HOST_PREFIX = "/api/"
    public _menu : Array<any> = [];

    set menu( menu : Array<any>) {
        this._menu=menu;
    }

    get menu() : Array<any> {
        return this._menu;
    }

    public static stringToDate(date : string) : Date {
        let d = new Date(date);
        return Global.isValidDate(d) ? d : null;
    } 

    public static isValidDate(d : any) {
        return !isNaN(d) && d instanceof Date;
    }

    public static errorComunication(error) {
        
    }

    constructor(){}
}