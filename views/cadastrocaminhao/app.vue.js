const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="form-right" class="titulo">
        <div id="formulario-cadastro" class="row forms">
            <div class="row text-center">
                <div class="col-md-12 margin-input">
                    <h1 class="h1-cad-caminhao">CADASTRAR CAMINHÃO</h1>
                </div>
            </div>
            <!-- ******************TIPO DE CAMINHÃO*************** -->
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
                        placeholder="Nome do motorista">
                    </ejs-textbox>
                </div>
            </div>
            <!-- ******************RETIRADA*************** -->
            <div class="row">
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="placa-caminhao"
                        id="placa-caminhao"
                        maxlength="50"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa do caminhão">
                    </ejs-textbox>
                </div>
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox
                        floatLabelType="Auto"
                        ref="placa-carreta"
                        id="placa-carreta"
                        maxlength="50"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        placeholder="Placa da carreta">
                    </ejs-textbox>
                </div>
                <!-- ******************CPF*************** -->
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox
                        ref="cpf"
                        id="cpf"
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
            <div class="row">
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
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
                <div class="col-md-4 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="tipo-carreta"
                        id="tipo-carreta"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        maxlength="60"
                        placeholder="Modelo da Carreta">
                    </ejs-textbox>
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
            <div class="row text-center" style="margin-top: 2em;">
                <div class="col-md-12 margin-input align-center">
                    <ejs-progressbutton 
                        id="zoomin"
                        content="CADASTRAR"
                        :enableProgress="true"
                        v-on:click.native="Cadastrar_usuario"
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
                this.$refs.nome.focusIn();
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

