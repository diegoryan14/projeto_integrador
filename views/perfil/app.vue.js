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
                        <div class="col-md-12 margin-input" style="margin-top: 6px;">
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
                    </div>
                    <div class="row">
                        <div class="col-md-4 margin-input" style="margin-top: 6px;">
                            <ejs-maskedtextbox
                                ref="CPF"
                                id="CPF"
                                mask="###.###.###-##"
                                disabled="true"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                maxlength="11"
                                placeholder='CPF'
                                v-model="input.CPF">
                            </ejs-maskedtextbox>
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
                            <ejs-maskedtextbox
                                ref="idade"
                                id="idade"
                                mask="##"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                maxlength="11"
                                placeholder='Idade'
                                v-model="input.IDADE">
                            </ejs-maskedtextbox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 margin-input" style="margin-top: 6px;">
                            <ejs-maskedtextbox
                                ref="celular"
                                id="celular"
                                mask="(##)#####-####"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                maxlength="11"
                                placeholder='Celular'
                                v-model="input.CELULAR">
                            </ejs-maskedtextbox>
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
                IDADE: null,
                CELULAR: null
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
                // this.input.IDADE = res.data[0].IDADE;
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
            if(this.input.IDADE != null || this.input.IDADE != ''){
                if(parseInt(this.input.IDADE) < 21){
                    alert('A sua Idade não pode ser menor que 21 anos!!');
                    return;
                }
            }
            var obj = {
                'NOME': this.input.NOME,
                'EMAIL': this.input.EMAIL,
                'IDADE': this.input.IDADE,
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
            this.input.IDADE = null;
            this.input.CELULAR = null;
        }
    },
    mounted(){
        this.getUsuario();
    }
})

