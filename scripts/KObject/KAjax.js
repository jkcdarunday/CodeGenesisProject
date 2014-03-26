/*
 *   This program is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU General Public License
 *   as published by the Free Software Foundation; either version 2
 *   of the License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, write to the Free Software
 *   Foundation, Inc., 51 Franklin Street, Fifth Floor,
 *   Boston, MA  02110-1301, USA.
 *
 *   ---
 *   Copyright (C) 2014, Jan Keith Darunday <jkcdarunday@uplb.edu.ph>
 */

define(['KObject'], function(KObject){
    var KAjax = KObject.extend({
        init:function(){
            KObject.call(this);

            this.xmlr = KAjax.createXMLHttpRequest();

            this.xmlr.KParent = this;

            this.xmlr.timeout = 4000;

            this.xmlr.ontimeout = function(){
                console.log("The previous request timed out.");
            }

            this.xmlr.onerror = function(){
                console.log("An error has occured while attempting to send a request to the server.");
            }

        },
        requestGet:function(url){
            this.xmlr.onreadystatechange = function(){
                if(this.readyState == 4){
                    this.KParent.emit("finished", this.responseText);
                }
            }

            this.xmlr.open("GET", url, true);
            this.xmlr.send();
        },
        requestPost:function(url, data){
            this.xmlr.onreadystatechange = function(){
                if(this.readyState == 4){
                    if(this.status == 0) console.log("A server timeout has occured.");
                    else if(this.status != 200) console.log("The server responded with a status code of " + this.status + ".");
                    //             else if(this.responseText.length <= 0) this.onerror;
                    else this.KParent.emit("finished", this.responseText);
                }
            }

            this.xmlr.open("POST", url, true);
            this.xmlr.setRequestHeader("Content-length", data.length);
            this.xmlr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.xmlr.setRequestHeader("Connection", "close");
            this.xmlr.send(data);
        }
    });
    KAjax.createXMLHttpRequest = function () {
        try { return new XMLHttpRequest(); }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (e) {}
        throw new Error("This browser does not support XMLHttpRequest.");
    };
    return KAjax;
});
