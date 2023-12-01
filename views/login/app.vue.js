const AppTemplate = `
<div id="forms-cad">
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <div class="row">
                <div class="col-md-8 margin-input">
                    <h4 class="login-text text-center" style="color: black;">{{nomeLogin}}</h4>
                </div>
            </div>
            <div v-if="TIPO_USUARIO == 'CAM'">
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
                            <ejs-button id="botao-cadastrar" cssClass='e-link' v-on:click.native='btnClick'>Não tem login? Cadastre-se</ejs-button><br>
                            <ejs-button id="botao-cadastrar" cssClass='e-link' v-on:click.native='infoEmp'>Logar como Empresa</ejs-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="TIPO_USUARIO == 'EMP'">
                <div class="row">
                    <div class="col-md-8 margin-input">
                        <ejs-maskedtextbox
                            ref="CNPJ"
                            id="CNPJ"
                            mask="##.###.###/####-##"
                            floatLabelType="Auto"
                            cssClass="e-outline"
                            maxlength="14"
                            placeholder='CNPJ'
                            v-model="input.cnpj">
                        </ejs-maskedtextbox>
                    </div>
                </div>
                <div class="row margin-input" style="margin-top: 6px;">
                    <div class="col-md-8 margin-input">
                        <ejs-textbox 
                            floatLabelType="Auto"
                            ref="senha"
                            id="senha"
                            v-model="input.senhaEmp"
                            type="password"
                            style="text-transform: unset;"
                            maxlength="30"
                            cssClass="e-outline"
                            placeholder="Senha">
                        </ejs-textbox>
                    </div>
                </div>
                <div class="row text-center" style="margin-top: 2em">
                    <div class="col-md-12 margin-input">
                        <div class="col-md-8 margin-input">
                            <ejs-progressbutton 
                                id="zoomin"
                                content="ENTRAR"
                                v-on:click.native="LoginEmp"
                                :enableProgress="true"
                                :spinSettings="spinCenter"
                                :animationSettings="zoomIn"
                                cssClass="e-round-corner">
                            </ejs-progressbutton>
                        </div>
                    </div>              
                    <div class="col-md-12 margin-input">
                        <div class="col-md-8 margin-input">
                            <ejs-button id="botao-cadastrar" cssClass='e-link' v-on:click.native='btnClickEmp'>Não tem login? Cadastre-se</ejs-button><br>
                            <ejs-button id="botao-cadastrar" cssClass='e-link' v-on:click.native='infoCam'>Logar como Caminhoneiro</ejs-button>
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
            spinCenter : { position: 'Center' },
            zoomIn : { effect: 'ZoomIn' },
            input: {
                cpf: null,
                senha: null,
                cnpj: null,
                senhaEmp: null
            },
            TIPO_USUARIO: 'CAM',
            nomeLogin: 'LOGIN CAMINHONEIRO'
        }
    },
    methods: {
        infoEmp(){
            this.TIPO_USUARIO = 'EMP';
            this.nomeLogin = 'LOGIN EMPRESA';
        },
        infoCam(){
            this.TIPO_USUARIO = 'CAM';
            this.nomeLogin = 'LOGIN CAMINHONEIRO';
        },
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/cadastroLogin';
        },
        btnClickEmp() {
            window.location.href = 'http://localhost/test/projeto_integrador/cadastroEmpresa';
        },
        Login(){
            if(this.input.cpf == null || this.input.cpf.trim() == ''){
                alert('Por Favor, Insira o CPF!!');
                this.$refs.CPF.focusIn();
                return;
            }
            if(this.input.senha == null || this.input.senha.trim() == ''){
                alert('Por Favor, Insira a senha!!');
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
                    this.limpar_campos();
                    return;
                }
                if(res.data.code == '1'){
                    console.log(res);
                    if(res.data.TIPO_USUARIO == 1){
                        window.location.href = BASE + '/index/';
                        this.limpar_campos();
                        return;
                    }
                }
            })
        },
        LoginEmp(){
            if(this.input.cnpj == null || this.input.cnpj.trim() == ''){
                alert('Por Favor, Insira o CNPJ!!');
                return;
            }
            if(this.input.senhaEmp == null || this.input.senhaEmp.trim() == ''){
                alert('Por Favor, Insira a Senha!!')
                return;
            }
            var obj = {
                'CNPJ': this.input.cnpj,
                'SENHA': this.input.senhaEmp
            }
            axios.post(BASE + "/login/LoginEmp",obj).then((res) => {
                console.log(res);
                if(res.data.code == '0'){
                    alert(res.data.msg);
                    this.limpar_campos();
                    return;
                }
                if(res.data.code == '1'){
                    window.location.href = BASE + '/index_empresa/';
                    this.limpar_campos();
                    return;
                }
            })
        },
        limpar_campos(){
            this.input.cpf = '';
            this.input.senha = '';
            this.input.cnpj = '';
            this.input.senhaEmp = '';
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