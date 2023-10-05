const AppTemplate = `
<div id="forms-cad" style='height: 100vh;'>
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <!-- ******************EMAIL*************** -->
            <div class="row">
                <div class="col-md-8 margin-input">
                    <h1 class="login-text text-center">LOGIN</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 margin-input">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Email"></ejs-textbox>
                </div>
            </div>                
            <!-- ******************SENHA*************** -->
            <div class="row margin-input" style="margin-top: 6px;">
                <div class="col-md-8 margin-input">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Senha"></ejs-textbox>
                </div>
            </div>
            <!-- BOTÃO -->
            <div class="row text-center" style="margin-top: 2em">
                <div class="col-md-8 margin-input">
                    <ejs-progressbutton id="zoomin" content="ENTRAR" :enableProgress="true" :spinSettings="spinCenter" :animationSettings="zoomIn"
                    cssClass="e-round-corner"></ejs-progressbutton>
                </div>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
            spinCenter : { position: 'Center' },
            zoomIn : { effect: 'ZoomIn' }
        }
    },
    methods: {
    },
    mounted(){
    }
})

