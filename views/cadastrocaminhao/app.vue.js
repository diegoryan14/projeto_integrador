const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="form-right" class="titulo">
        <div id="formulario-cadastro" class="row forms">
        <div class="card-body" style="margin-top: 1em">
            <div class="h4-sel-carga">
                <h4 class="test">Cadastrar Caminhão</h4>
            </div>
            <!-- ******************RETIRADA*************** -->
            <div class="row">
                <div class="col-md-2 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox
                        floatLabelType="Auto"
                        ref="placa-caminhao"
                        id="placa-caminhao"
                        maxlength="50"
                        mask="0000-000"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa do caminhão">
                    </ejs-maskedtextbox>
                </div>
                <div class="col-md-2 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox
                        floatLabelType="Auto"
                        ref="placa-carreta"
                        id="placa-carreta"
                        maxlength="50"
                        mask="0000-000"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa da carreta">
                    </ejs-maskedtextbox>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-dropdownlist 
                        floatLabelType="Auto"
                        ref="tipo-carreta"
                        id="tipo-carreta"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        maxlength="60"
                        placeholder="Modelo da Carreta">
                    </ejs-dropdownlist>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="tipo-caminhao"
                        id="tipo-caminhao"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        maxlength="60"
                        placeholder="Modelo do Caminhao">
                    </ejs-textbox>
                </div>
            </div>
            <!-- BOTÃO -->
            <div class="button">
                <button type="button" class="btn btn-outline-primary btn-carga">Cadastrar</button>
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
            spinCenter : { position: 'Center' },
            zoomIn : { effect: 'ZoomIn' },
            value: '',
            input: {
                nome: null,
                placaCaminhao: null,
                placaCarreta: null,
                email: null,
                cpf: null,
                senha: null,
                confirm_senha: null
            }
        }
    },
    methods: {
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/loginPage';
        },
        Cadastrar_usuario(){
            if(this.input.nome == null || this.input.nome.trim() == ''){
                alert('Por Favor, Insira o Nome');
                this.$refs.nome.focusIn();//
                return;
            }
            if(this.input.email == null || this.input.email.trim() == ''){
                alert('Por Favor, Insira o E-mail');
                this.$refs.email.focusIn();
                return;
            }
            if(this.input.cpf == null || this.input.cpf.trim() == ''){
                alert('Por Favor, Insira o CPF');
                this.$refs.cpf.focusIn();
                return;
            }

            var obj = {
                'NOME': this.input.nome,
                'EMAIL': this.input.email,
                'CPF': this.input.cpf,

            }
            axios.post(BASE + "/cadastroLogin/Cadastrar_usuario",obj).then((res) => {
                if(res.data.code == '0'){
                    alert(res.data.msg);
                    return;
                }
                alert(res.data.msg);
                this.limpar_campos();
                window.location.href = BASE + '/index/';
                return;
            })
        },
        limpar_campos(){
            this.input.nome = null;
            this.input.cpf = null;
            this.input.email = null;
        }
    },
    mounted(){
    }
})
