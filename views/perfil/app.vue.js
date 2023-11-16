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
                                maxlength="60"
                                v-model="input.NOME"
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
                                maxlength="11"
                                disabled="true"
                                v-model="input.CPF"
                                style="text-transform: unset;"
                                cssClass="e-outline"
                                placeholder="CPF">
                            </ejs-textbox>
                        </div>
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-textbox
                                floatLabelType="Auto"
                                ref="email"
                                maxlength="50"
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
                NOME: null,
                CPF: null,
                EMAIL: null,
                DATA_NASCIMENTO: null,
                CELULAR: null,
                SENHA: null,
                SOBRENOME: null
            }
        }
    },
    methods: {
        getUsuario(){
            axios.post(BASE + "/perfil/getUsuario").then((res) => {
                this.input.NOME = res.data[0].NOME;
                this.input.EMAIL = res.data[0].EMAIL;
                this.input.CPF = res.data[0].CPF;
                // this.input.CELULAR = res.data[0].CELULAR;
                // this.input.DATA_NASCIMENTO = res.data[0].DATA_NASCIMENTO;
            })
        },
        salvarPerfil() {
            if(this.input.NOME == null){
                alert('Por Favor, insira o nome!!');
                return;
            }
            if(this.input.EMAIL == null){
                alert('Por favor, insira o E-mail!!');
                return;
            }
            var obj = {
                'NOME': this.input.NOME,
                'EMAIL': this.input.EMAIL,
                'DATA_NASCIMENTO': this.input.DATA_NASCIMENTO,
                'CELULAR': this.input.CELULAR
            }
            axios.post(BASE + "/perfil/salvarPerfil",obj).then((res) => {
                if(res.data.code == 0){
                    alert(res.data.msg);
                    this.limpar_campos();
                    this.getUsuario();
                    return;
                }
                alert(res.data.msg);
                this.limpar_campos();
                this.getUsuario();
            })
        },
        limpar_campos(){
            this.input.NOME = null;
            this.input.EMAIL = null;
            this.input.CPF = null;
            this.input.DATA_NASCIMENTO = null;
            this.input.CELULAR = null;
            this.input.SENHA = null;
            this.input.SOBRENOME = null;
        }
    },
    mounted(){
        this.getUsuario();
    }
})

