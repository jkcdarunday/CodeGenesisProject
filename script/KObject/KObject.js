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
var KOBJECT_INIT=false;

function KObject(){
     this.signals = [];
//     this.slots = {};
}

KObject.prototype = {
    "emit":function(signal){
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
    source.signals.push({"name":signal, "object":target, "slot":slot});
}

KTHREADS = {
    count:0
};

var KThread = KObject.extend({
    init: function(func, interval){
        this.constructor.super.call(this);
        if(typeof document != 'object')
            throw Error("Oh my, we can't run threads in nodejs yet.");
        this.run = func;
        this.interval = interval;
        KTHREADS[this.id=KTHREADS.count++] = this;
        console.log("Created Thread with ID " + this.id);
    },
    run: function(){
    },
    stop: function(){
        this.isRunning = false;
    },
    start: function(){
        this.isRunning = true;
        this.loop();
    },
    loop: function(id){
        if(id == undefined) id = this.id;
        KTHREADS[id].run.apply(KTHREADS[id]);
        if(KTHREADS[id].isRunning)
            setTimeout("KTHREADS[" + id + "].loop(" + id + ");", this.interval);
    }
});

// module.exports/*.KObject*/ = KObject;
// module.exports.KThread = KThread;
