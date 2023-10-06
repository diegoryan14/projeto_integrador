const AppTemplate = `
<div id="forms-cad" style='height: 100vh;'>
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <div class="row text-center">
                <div class="col-md-12 margin-input">
                    <h1>CADASTRE-SE</h1>
                </div>
            </div>
            <!-- ******************NOME*************** -->
            <div class="row">
                <div class="col-md-12 margin-input" style="margin-top: 6px;">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Nome"></ejs-textbox>
                </div>
            </div>
            <!-- ******************EMAIL*************** -->
            <div class="row">
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Email"></ejs-textbox>
                </div>
                <!-- ******************CPF*************** -->
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox floatLabelType="Auto" placeholder="CPF" cssClass="e-outline" v-model="value" :value="value" mask='000-000-000-00'></ejs-maskedtextbox>
                </div>
            </div>
            <!-- ******************SENHA*************** -->
            <div class="row">
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Senha" type="password"></ejs-textbox>
                </div>
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox floatLabelType="Auto" cssClass="e-outline" placeholder="Confirmação de Senha" type="password"></ejs-textbox>
                </div>
            </div>
            <!-- BOTÃO -->
            <div class="row text-center" style="margin-top: 2em;">
                <div class="col-md-12 margin-input align-center">
                    <ejs-progressbutton id="zoomin" content="CADASTRAR" :enableProgress="true" :spinSettings="spinCenter" :animationSettings="zoomIn"
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
            zoomIn : { effect: 'ZoomIn' },
            value : ''
        }
    },
    methods: {
    },
    mounted(){
    }
})

