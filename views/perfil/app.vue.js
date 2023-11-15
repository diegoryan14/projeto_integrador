const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="primeiro-retangulo"> 
        <div style="display:block">
            <div class="h4-sel-carga">
                <h2 class="test">PERFIL</h2>
            </div>
            <div id="segundo-retangulo">
                <div class="teste">
                    <div class="row">
                        <div class="col-md-6 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="nomes"
                                maxlength="7"
                                v-model="input.NOMES"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Nome*">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-6 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="sobrenome"
                                maxlength="7"
                                v-model="input.SOBRENOME"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Sobrenome  *">
                            </ejs-textbox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                mask="###.###.###-##"
                                floatLabelType="Auto"
                                ref="cpf"
                                maxlength="7"
                                v-model="input.CPF"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="CPF/CNPJ*">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="email"
                                maxlength="7"
                                v-model="input.EMAIL"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Email*">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-datepicker 
                                floatLabelType="Auto"
                                v-model="input.DATA_NASCIMENTO"
                                cssClass="e-outline"
                                placeholder="Data nascimento">
                            </ejs-datepicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                mask="000-000-0000"
                                floatLabelType="Auto"
                                maxlength="12"
                                v-model="input.CELULAR"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Celular*">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-6 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="SENHA"
                                maxlength="100"
                                v-model="input.SENHA"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="Senha*">
                            </ejs-textbox>
                        </div>
                    </div>
                    <div style="margin-top: 20px; display:flex; justify-content:center; align-items:center">
                        <button type="button" class="button"  @click="salvarPerfil">Salvar</button>
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
        salvarPerfil() {
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

