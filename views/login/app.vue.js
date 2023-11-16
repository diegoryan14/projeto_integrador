const AppTemplate = `
<div id="forms-cad">
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <div class="row">
                <div class="col-md-8 margin-input">
                    <h1 class="login-text text-center">LOGIN</h1>
                </div>
            </div>
            <!-- ******************CPF*************** -->
            <div class="row">
                <div class="col-md-8 margin-input">
                    <ejs-maskedtextbox
                        ref="CPF"
                        id="CPF"
                        mask="###.###.###-##"
                        floatLabelType="Auto"
                        cssClass="e-outline"
                        maxlength="14"
                        placeholder='CPF'
                        v-model="input.cpf">
                    </ejs-maskedtextbox>
                </div>
            </div>                
            <!-- ******************SENHA*************** -->
            <div class="row margin-input" style="margin-top: 6px;">
                <div class="col-md-8 margin-input">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="senha"
                        id="senha"
                        v-model="input.senha"
                        type="password"
                        style="text-transform: unset;"
                        maxlength="30"
                        cssClass="e-outline"
                        placeholder="Senha">
                    </ejs-textbox>
                </div>
            </div>
            <!-- BOTÃO -->
            <div class="row text-center" style="margin-top: 2em">
                <div class="col-md-12 margin-input">
                    <div class="col-md-8 margin-input">
                        <ejs-progressbutton 
                            id="zoomin"
                            content="ENTRAR"
                            v-on:click.native="Login"
                            :enableProgress="true"
                            :spinSettings="spinCenter"
                            :animationSettings="zoomIn"
                            cssClass="e-round-corner">
                        </ejs-progressbutton>
                    </div>
                </div>                
                <div class="col-md-12 margin-input">
                    <div class="col-md-8 margin-input">
                        <ejs-button id="botao-cadastrar" cssClass='e-link' v-on:click.native='btnClick'>Não tem login? Cadastre-se</ejs-button>
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
            input: {
                cpf: null,
                senha: null
            }
        }
    },
    methods: {
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/cadastroLogin';
        },
        Login(){
            if(this.input.cpf == null || this.input.cpf.trim() == ''){
                alert('Por Favor, Insira o CPF');
                this.$refs.CPF.focusIn();
                return;
            }
            if(this.input.senha == null || this.input.senha.trim() == ''){
                alert('Por Favor, Insira a senha');
                this.$refs.senha.focusIn();
                return;
            }
            var obj = {
                'CPF': this.input.cpf,
                'SENHA': this.input.senha
            }
            axios.post(BASE + "/login/Login",obj).then((res) => {
                if(res.data.code == '0'){
                    alert(res.data.msg);
                    return;
                }
                if(res.data.code == '1'){
                    console.log(res);
                    if(res.data.TIPO_USUARIO == 1){
                        window.location.href = BASE + '/index/';
                        this.limpar_campos();
                        return;
                    }
                    if(res.data.TIPO_USUARIO == 2){
                        window.location.href = BASE + '/index_empresa/';
                        this.limpar_campos();
                        return;
                    }
                }
            })
        },
        limpar_campos(){
            this.input.cpf = '';
            this.input.senha = '';
        }
    },
    mounted(){
        this.$refs.CPF.focusIn();
        // this.$refs.senha.addIcon('append', 'fas fa-eye-slash');
        // document.querySelector('#senha .fa-eye-slash').addEventListener('click', () => {
        //     if (this.count == 0) {
        //         this.$refs.senha.ej2Instances.type = 'text';
        //         this.$refs.senha.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye e-input-group-icon'
        //         this.count = 1
        //     } else {
        //         this.$refs.senha.ej2Instances.type = 'password'
        //         this.$refs.senha.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye-slash e-input-group-icon'
        //         this.count = 0
        //     }
        // });
    }
});