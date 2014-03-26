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

define(function(){

    function KObject(){
        this.signals = [];
    //     this.slots = {};
    }

    KObject.debug = {};

    KObject.prototype = {
        "emit":function(signal){
            if(KObject.debug["emit"])
                console.log("Emitting signal " + signal);
            var index = undefined;
            for(var i=0;i<this.signals.length;i++)
                if(this.signals[i].name == signal){
                    var $signal = this.signals[i];
                    var $args = arguments;
                    $signal.object.slots[$signal.slot].apply($signal.object, Array.prototype.slice.call($args, 1));
                    //setTimeout(function(){$signal.object.slots[$signal.slot].apply($signal.object, Array.prototype.slice.call($args, 1));},1);
                }
        },
        "hasSlot":function(slot){
            return this.slots.hasOwnProperty(slot);
        }
    };

    KObject.extend = function(target, source){
        if(target instanceof Function && (source == undefined || source == null)){
            target.prototype = Object.create(KObject.prototype);
            target.prototype.constructor = target;
            target.super = KObject;
            target.extend = this.extend;
            return target;
        }else if(target instanceof Object && target['init'] != undefined && (source == undefined || source == null)){
            var tmp = target['init'];
            tmp.prototype = Object.create(this.prototype);
            for(var i in target)
                if(i!='init') tmp.prototype[i] = target[i]; //Override
            tmp.prototype.constructor = target.init;
            tmp.super = this;
            tmp.extend = this.extend;
            return tmp;
        }else if(target instanceof Object && source instanceof Object){ //Mixin
            for(var i in source)
                //             if(!target.hasOwnProperty(i))
                target[i] = source[i];
        }else{
            throw Error('KObject.extend has invalid arguments.');
        }
    }

    KObject.prototype.extend = function(source){
        if(source instanceof Object && source['init'] != undefined){
            var tmp = source.init;
            KObject.extend(tmp.prototype, this.prototype);
            tmp.prototype.constructor = source.init;
            tmp.prototype.super = this;
            return tmp;
        } else {
            throw Error('KObject.prototype.extend has invalid arguments');
        }
    }

    KObject.connect = function(source, signal, target, slot){
        if(KObject.debug["connect"])
            console.log("Connecting signal " + signal + " of " + source + " to slot " + slot + " of " + target);
        source.signals.push({"name":signal, "object":target, "slot":slot});
    }

    return KObject;
});
