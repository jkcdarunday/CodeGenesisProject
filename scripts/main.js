require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene",
        "KSmoothVariable": "KObject/KSmoothVariable",
        "KKeyboard": "KObject/KKeyboard",
        "KText": "KObject/KText",

        "GMenu": "Game/Scenes/Menu"
    }
});

define(["KCanvas", "KScene", 'KObject', "KKeyboard","GMenu"],function(KCanvas, KScene, KObject, KKeyboard, GMenu){
    var cc = new KCanvas('#leCanvas');
    cc.scene = new GMenu();
    var kb = new KKeyboard(document.body, false);
    KObject.connect(kb, 'keyDown', cc.scene, 'keyReactor');
    cc.start();
    cc.windowSet(window);
});
