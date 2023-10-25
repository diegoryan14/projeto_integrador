const AppTemplate = `

<div class="container control-section">
    <div class="row titulo">
        <div class="col-md-4">
            <div class="card test2">
                <div class="card-body">
                    <div class="h4-sel-carga">
                        <h4 class="test">Cadastro de Caminhão</h4>
                    </div>
                    <p class="card-text p-text">Cadastre aqui os dados do seu caminhão para começar a rodar.</p>
                    <div class="button">
                        <button type="button" class="btn btn-outline-primary btn-carga">Cadastre aqui</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card test2">
                <div class="card-body">
                    <div class="h4-sel-carga">
                        <h4 class="test">Contato com Empresa</h4>
                    </div>
                    <p class="card-text p-text">Acesse aqui para ter um melhor contato com a empresa que deseja.</p>
                    <div class="button">
                        <button type="button" class="btn btn-outline-primary btn-carga">Acesse aqui</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card test2">
                <div class="card-body">
                    <div class="h4-sel-carga">
                        <h4 class="test">Selecionar Carga</h4>
                    </div>
                    <p class="card-text p-text">Acesse aqui para selecionar a carga que mais se parece com a que você procura.</p>
                    <div class="button">
                        <button type="button" class="btn btn-outline-primary btn-carga">Selecione aqui</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card test3">
                <div class="card-body">
                    <div class="h4-sel-carga">
                        <h4 class="test">Disponibilidade de Carga</h4>
                    </div>
                    <div class="alinhar">
                        <div class="row margin-input">
                            <div class="col-md-2 margin-input">
                                <ejs-textbox 
                                    floatLabelType="Auto"
                                    ref="senha"
                                    id="text-disp"
                                    type="text"
                                    style="text-transform: unset;"
                                    maxlength="30"
                                    cssClass="e-outline"
                                    placeholder="Senha">
                                </ejs-textbox>
                            </div>
                            <div class="col-md-2 margin-input">
                                <ejs-textbox 
                                    floatLabelType="Auto"
                                    ref="senha"
                                    id="text-disp"
                                    type="text"
                                    style="text-transform: unset;"
                                    maxlength="30"
                                    cssClass="e-outline"
                                    placeholder="Senha">
                                </ejs-textbox>
                            </div>
                        </div>
                    </div>
                    <div class="button">
                        <button type="button" class="btn btn-outline-primary btn-carga">Pesquisar</button>
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
        }
    },
    methods: {
    },
    mounted(){
    }
})