const AppTemplate = `
<div id="forms-cad" style='height: 100vh;'>
    <div id="form-right">
        <div id="formulario-cadastro" class="row">
            <div class="row text-center">
                <div class="col-md-12 margin-input">
                    <h1>CADASTRE-SE</h1>
                </div>
            </div>
            <!-- ******************NOME*************** -->
            <div class="row">
                <div class="col-md-12 margin-input" style="margin-top: 6px;">
                    <ejs-textbox 
                        floatLabelType="Auto"
                        ref="nome"
                        id="nome"
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        v-model="input.nome"
                        placeholder="Nome">
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
                        style="text-transform: unset;"
                        cssClass="e-outline"
                        v-model="input.email"
                        placeholder="Email">
                    </ejs-textbox>
                </div>
                <!-- ******************CPF*************** -->
                <div class="col-md-6 margin-input" style="margin-top: 6px;">
                    <ejs-maskedtextbox
                        floatLabelType="Auto"
                        ref="cpf"
                        id="cpf"
                        placeholder="CPF"
                        cssClass="e-outline"
                        v-model="input.cpf"
                        :value="value"
                        mask='000-000-000-00'>
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
                        v-on:click.native="Cadastrar_usuario"
                        :spinSettings="spinCenter"
                        :animationSettings="zoomIn"
                        cssClass="e-round-corner">
                    </ejs-progressbutton>
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
                cpf: null,
                senha: null,
                confirm_senha: null
            }
        }
    },
    methods: {
        Cadastrar_usuario(){
            var obj = {
                'NOME': this.input.nome,
                'EMAIL': this.input.email,
                'CPF': this.input.cpf,
                'SENHA': this.input.senha,
                'CONFIRM_SENHA': this.input.confirm_senha
            }
            axios.post(BASE + "/cadastroLogin/Cadastrar_usuario",obj).then((res) => {

            })
        }
    },
    mounted(){
    }
})

