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
 *   Copyright (C) 2014, Aesir Development Team <admin@aesir.url.ph>
 */

define(function(){
    return function(x){
        var result;
        //if(isNaN(document) || document == undefined) throw Error("document variable doesn't exist. We're probably not running in a browser.");
        if(typeof x === 'string' || x instanceof String){
            if(x[0] == '#') return document.getElementById(x.substring(1));
            else if(x[0] == '.') return document.getElementsByClassName(x.substring(1));
            else return document.getElementsByTagName(x);
        }
    }
});
