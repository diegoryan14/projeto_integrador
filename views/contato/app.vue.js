const AppTemplate = `
<div class="container control-section forms-cad ">
    <div id="primeiro-retangulo"> 
        <div style="display:block">
            <div class="h4-sel-carga">
                <h2 class="test">ENTRAR EM CONTATO</h2>
            </div>
            <div id="segundo-retangulo">
                <div class="teste">
                    <div>
                        <h4>Empresa</h4>
                        <span>Pão & CIA</span>
                        <h4>Sobre a Empresa</h4>
                        <p>farfa rgrgsr agr rg</p>
                    </div>
                    <div>
                        <h4>Sobre a Carga</h4>
                        <div>
                            <p>informação</p>
                            <p>informação</p>
                            <p>informação</p>
                            <p>informação</p>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 20px; display:flex; justify-content:center; align-items:center">
                    <button type="button" class="button"  >Eu quero!</button>
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
            data:[]
        }
    },
    methods: {
    },
    mounted(){
    }
})

