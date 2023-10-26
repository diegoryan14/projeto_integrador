const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="form-right" class="titulo">
        <div id="formulario-cadastro" class="row forms">
            <div class="row text-center">
                <div class="h1-cad-caminhao">
                    <h2 class="test">Cadastrar Caminhão</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="tipo-caminhao"
                        id="tipo-caminhao"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        v-model="input.MODELO_CAMINHAO"
                        maxlength="50"
                        placeholder="Modelo do Caminhao">
                    </ejs-textbox>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="placa-caminhao"
                        id="placa-caminhao"
                        maxlength="7"
                        v-model="input.PLACA_CAMINHAO"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa do caminhão">
                    </ejs-textbox>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="tipo-carreta"
                        id="tipo-carreta"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        v-model="input.MODELO_CARRETA"
                        maxlength="50"
                        placeholder="Modelo da Carreta">
                    </ejs-textbox>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="placa-carreta"
                        id="placa-carreta"
                        maxlength="7"
                        v-model="input.PLACA_CARRETA"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa da carreta">
                    </ejs-textbox>
                </div>
                <div class="col-md-8 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="DESCRICAO"
                        id="DESCRICAO"
                        maxlength="300"
                        v-model="input.DESCRICAO"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Descrição">
                    </ejs-textbox>
                </div>
            </div>
            <div class="row">
            </div>
            <!-- BOTÃO -->
            <div class="row text-center" style="margin-top: 2em;">
                <button type="button" @clicik="cadastrarCaminhao" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Cadastrar Caminhão
                </button>
                <div class="col-md-12 margin-input">
                    <ejs-button id="botao-voltar" cssClass='e-link' v-on:click.native='btnClick'>Voltar</ejs-button>
                </div>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                        </div>
                    </div>
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
            input: {
                PLACA_CAMINHAO: null,
                MODELO_CAMINHAO: null,
                PLACA_CARRETA: null,
                MODELO_CARRETA: null,
                DESCRICAO: null
            }
        }
    },
    methods: {
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/loginPage';
        },
        get_cargas(){
            // axios.post(BASE + "/cadastrocaminhao/cadastrarCaminhao",obj).then((res) => {
            //     if(res.data.code == 0){
            //         alert(res.data.msg);
            //         return;
            //     }
            // })
        },
        cadastrarCaminhao(){
            if(this.input.PLACA_CAMINHAO == null || this.input.PLACA_CAMINHAO.trim() == ''){
                alert("Por Favor, Insira a Placa do Caminhão!");
                return;
            }
            var obj = {
                'PLACA_CAMINHAO': this.input.PLACA_CAMINHAO,
                'MODELO_CAMINHAO': this.input.MODELO_CAMINHAO,
                'PLACA_CARRETA': this.input.PLACA_CARRETA,
                'MODELO_CARRETA': this.input.MODELO_CARRETA,
                'DESCRICAO': this.input.DESCRICAO
            }
            axios.post(BASE + "/cadastrocaminhao/cadastrarCaminhao",obj).then((res) => {
                if(res.data.code == 0){
                    alert(res.data.msg);
                    return;
                }
                alert(res.data.msg);
            })
        }
    },
    mounted(){
    }
})

