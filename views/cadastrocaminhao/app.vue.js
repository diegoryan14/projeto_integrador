const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="primeiro-retangulo"> 
        <div style="display:block">
            <div class="h4-sel-carga">
                <h2 class="test">INFORMAÇÕES SOBRE O CAMINHÃO</h2>
            </div>
            <div id="segundo-retangulo">
                <div class="teste">
                    <div class="row">
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-dropdownlist 
                                :dataSource='dataModelo' 
                                ref="tipo-caminhao"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                v-model="input.MODELO_CAMINHAO"
                                maxlength="50"
                                placeholder="Modelo*">
                            </ejs-dropdownlist>
                        </div>
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="placa-caminhao"
                                maxlength="7"
                                v-model="input.PLACA_CAMINHAO"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Placa*">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-dropdownlist 
                                :dataSource='dataModeloCarreta' 
                                floatLabelType="Auto"
                                ref="tipo-carreta"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                v-model="input.MODELO_CARRETA"
                                maxlength="50"
                                placeholder="Modelo da Carreta*">
                            </ejs-dropdownlist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="placa-carreta"
                                id="placa-carreta"
                                maxlength="7"
                                v-model="input.PLACA_CARRETA"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Placa da carreta*">
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
                                placeholder="Descrição*">
                            </ejs-textbox>
                        </div>
                    </div>
                    <div style="margin-top: 20px; display:flex; justify-content:center; align-items:center">
                        <button type="button" class="button"  @click="cadastrarCaminhao">Salvar</button>
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
            },
            dataModelo: [],
            dataModeloCarreta:[]
        }
    },
    methods: {
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/cadastroCarga';
        },
        cadastrarCaminhao(){
            
            // var placa = "ABC1234";
            // const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
            
            if(this.input.MODELO_CAMINHAO == null || this.input.MODELO_CAMINHAO.trim() == ''){
                alert("Por Favor, Insira a Modelo do Caminhão!");
                return;
            }
            if(this.input.PLACA_CAMINHAO == null || this.input.PLACA_CAMINHAO.trim() == ''){
                alert("Por Favor, Insira a Placa do Caminhão!");
                return;
            }
            if((this.input.PLACA_CAMINHAO.trim()).length < 7){
                alert("Por Favor, Digite corretamenta a placa do caminhao!");
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
                if(res.data.code == "0"){
                    alert(res.data.msg);
                    return;
                }
                alert(res.data.msg);
                this.limpar_campos();
            })
        },
        limpar_campos(){
            this.input.PLACA_CAMINHAO = null;
            this.input.MODELO_CAMINHAO = null;
            this.input.PLACA_CARRETA = null;
            this.input.MODELO_CARRETA = null;
            this.input.DESCRICAO = null;
        }
    },
    mounted(){
    }
})

