const AppTemplate = `
<div id="forms-cad" style='height: 100vh;'>
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <div class="row text-center">
                <div class="col-md-12 margin-input">
                    <h1 style="color: black;">CADASTRE-SE</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="nome"
                        id="nome"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        maxlength="60"
                        v-model="input.nome"
                        placeholder="Nome da Empresa">
                    </ejs-textbox>
                </div>
            </div>
            <!-- ******************EMAIL*************** -->
            <div class="row">
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="email"
                        id="email"
                        maxlength="50"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        v-model="input.email" 
                        placeholder="Email">
                    </ejs-textbox>
                </div>
                <!-- ******************CPF*************** -->
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox
                        ref="cnpj"
                        id="cnpj"
                        mask="##.###.###/####-##"
                        floatLabelType="Auto"
                        cssClass="e-outline"
                        maxlength="14"
                        placeholder='CNPJ'
                        v-model="input.cnpj">
                    </ejs-maskedtextbox>
                </div>
            </div>
            <!-- ******************SENHA*************** -->
            <div class="row">
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="senha"
                        id="senha"
                        maxlength="20"
                        v-model="input.senha"
                        type="password"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Senha">
                    </ejs-textbox>
                </div>
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="confirm_senha"
                        id="confirm_senha"
                        maxlength="20"
                        v-model="input.confirm_senha"
                        type="password"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Confirmação de Senha">
                    </ejs-textbox>
                </div>
            </div>
            <!-- BOTÃO -->
            <div class="row text-center" style="margin-top: 2em;">
                <div class="col-md-12 margin-input align-center">
                    <ejs-progressbutton 
                        id="zoomin"
                        content="CADASTRAR"
                        :enableProgress="true"
                        v-on:click.native="Cadastrar_empresa"
                        :spinSettings="spinCenter"
                        :animationSettings="zoomIn"
                        cssClass="e-round-corner">
                    </ejs-progressbutton>
                </div>
                <div class="col-md-12 margin-input">
                    <ejs-button id="botao-voltar" cssClass='e-link' v-on:click.native='btnClick'>Voltar</ejs-button>
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
                email: null,
                cnpj: null,
                senha: null,
                confirm_senha: null,
                tipo_usuario: 2, /* 1- Caminhoneiro // 2- Empresa */
            }
        }
    },
    methods: {
        btnClick() {
            window.location.href = 'http://localhost/test/projeto_integrador/login';
        },
        Cadastrar_empresa(){
            if(this.input.nome == null || this.input.nome.trim() == ''){
                alert('Por Favor, Insira o Nome da Empresa');
                this.$refs.nome.focusIn();
                return;
            }
            if(this.input.email == null || this.input.email.trim() == ''){
                alert('Por Favor, Insira o E-mail');
                this.$refs.email.focusIn();
                return;
            }
            if(this.input.cnpj == null || this.input.cnpj.trim() == ''){
                alert('Por Favor, Insira o CNPJ');
                this.$refs.cnpj.focusIn();
                return;
            }
            if(this.input.senha == null || this.input.senha.trim() == ''){
                alert('Por Favor, Insira a senha');
                this.$refs.senha.focusIn();
                return;
            }
            if(this.input.confirm_senha == null || this.input.confirm_senha.trim() == ''){
                alert('Por Favor, Insira a confirmação de senha');
                this.$refs.confirm_senha.focusIn();
                return;
            }
            var obj = {
                'NOME': this.input.nome,
                'EMAIL': this.input.email,
                'CNPJ': this.input.cnpj,
                'SENHA': this.input.senha,
                'CONFIRM_SENHA': this.input.confirm_senha,
                'TIPO_USUARIO': this.input.tipo_usuario
            }
            axios.post(BASE + "/cadastroEmpresa/Cadastrar_empresa",obj).then((res) => {
                if(res.data.code == '0'){
                    alert(res.data.msg);
                    return;
                }
                alert(res.data.msg);
                this.limpar_campos();
                window.location.href = BASE + '/index_empresa/';
                return;
            })
        },
        limpar_campos(){
            this.input.nome = null;
            this.input.email = null;
            this.input.cnpj = null;
            this.input.senha = null;
            this.input.confirm_senha = null;
        }
    },
    mounted(){
    }
})

