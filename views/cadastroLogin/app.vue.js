const AppTemplate = `
<div class="container">
    <div class="forms-container">
        <div class="signin-signup">
            <form class="sign-in-form">
                <h2 class="title">Faça login</h2>
                <div class="input-field">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Usuário">
                </div>
                <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Senha">
                </div>
                <input type="submit" value="Login" class="btn solid">
            </form>
            <form class="sign-up-form">
                <h2 class="title">Cadastre-se</h2>
                <div class="input-field">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Usuário">
                </div>
                <div class="input-field">
                    <i class="fas fa-envelope"></i>
                    <input class="input-transparent" type="email" placeholder="Email">
                </div>
                <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Senha">
                </div>
                <input type="submit" value="Cadastre-se" class="btn solid">
            </form>
        </div>
    </div>  
    <div class="panels-container">
        <!-- Primeiro Painel -->
        <div class="panel left-panel">
            <div class="content">
                <h3>Novo por aqui?</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nostrum nisi dicta.</p>
                <button class="btn transparent" id="sign-up-btn">Cadastre-se</button>
            </div>
        </div>
        <!-- Segundo Painel -->
        <div class="panel right-panel">
            <div class="content">
                <h3>Já possui um cadastro?</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nostrum nisi dicta.</p>
                <button class="btn transparent" id="sign-in-btn">Faça login</button>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function() {
        return {
        }
    },
    methods: {
    },
    mounted(){
    }
})

