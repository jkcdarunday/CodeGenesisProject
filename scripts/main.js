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

        "GMenu": "Game/Scenes/Menu",
        "GBattle": "Game/Scenes/Battle"
    }
});

define(["KCanvas", "KScene", 'KObject', "KKeyboard","GMenu", "GBattle"],function(KCanvas, KScene, KObject, KKeyboard, GMenu, GBattle){
    var cc = new KCanvas('#leCanvas');
//     KObject.debug['connect'] = true;
    cc.scenes = {};
    cc.scenes["menu"] = new GMenu();
    cc.scenes["battle"] = new GBattle();
    cc.scene = cc.scenes["menu"];
    KObject.connect(cc.scenes["menu"], "changeScene", cc, "changeScene");

    var kb = new KKeyboard(document.body, false);
    KObject.connect(kb, 'keyDown', cc.scene, 'keyReactor');
    KObject.connect(cc, 'windowResized', cc.scene, 'windowResized');
    cc.start();
    cc.windowSet(window);
});
