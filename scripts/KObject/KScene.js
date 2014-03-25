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

define(['KObject', 'KImage'], function(KObject, KImage){
    return KObject.extend({
        init: function(){
            this.constructor.super.call(this);
        },
        setBackground: function(image){
            this.background = image;
        },
        drawCropScale: function(image, canvas){
            var imageRatio = image.width/image.height;
            var canvasRatio = canvas.canvas.width/canvas.canvas.height;
            if(imageRatio > canvasRatio){
                var canvasCroppedWidth = (canvas.canvas.height*(1/imageRatio));
                canvas.drawImage(
                    image,
                    (image.width-canvasCroppedWidth)/2,
                    0,
                    canvasCroppedWidth,
                    image.height,
                    0,
                    0,
                    canvas.canvas.width,
                    canvas.canvas.height
                );
            } else {
                var imageCroppedHeight = (image.height*(1/canvasRatio));
                canvas.drawImage(
                    image,
                    0,
                    (image.height-imageCroppedHeight)/2,
                    image.width,
                    imageCroppedHeight,
                    0,
                    0,
                    canvas.canvas.width,
                    canvas.canvas.height
                );
            }

        },
        drawBackground: function(canvas){
            if(KIMAGES[this.background]){
                this.drawCropScale(KIMAGES[this.background], canvas);
                return true;
            } else {
                return false;
            }
        }
    });
});
