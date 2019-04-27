import { ElementRef, Renderer2 } from '@angular/core';
import { Type } from '@angular/compiler';

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

    public static enableShowPassword(elementRef : ElementRef, renderer : Renderer2) : void{
        elementRef.nativeElement.querySelectorAll('.sh_password').forEach(element => {
            let sh_bt = element.querySelector(".sh_bt");
            let input_bt_i = sh_bt.querySelector('i');
            renderer.listen(sh_bt, 'click', (event) => {
                let input = element.querySelector('input');
                if(input.getAttribute('type') === 'password') {
                    input.setAttribute('type','text');
                    input_bt_i.classList.remove("fa-eye");
                    input_bt_i.classList.add("fa-eye-slash");
                }else {
                    input.setAttribute('type','password');
                    input_bt_i.classList.remove("fa-eye-slash");
                    input_bt_i.classList.add("fa-eye");
                }
            });
        });
    }

    constructor(){}
}