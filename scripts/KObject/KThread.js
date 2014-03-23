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
var KTHREADS = {
    count:0
};

define(['KObject'], function(KObject){


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
        setInterval: function(i){
            this.interval = i;
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

    return KThread;
});
