<template>
    <div class="modal-cadastro-produto">
        <q-dialog :value="show" @input="fechar">
            <q-card flat bordered class="my-card" style="width: 700px; max-width: 150vw;">
                <modal-title-component title="Inclusão de produto" subtitle="" />
                <template>

          <div class="q-pm-auto">
            <div>
              <q-tabs
                v-model="tab"
                align="justify"
                class="q-mb-xs"
              >
                <q-tab class="text-orange" name="produto" label="Produto" />
                <q-tab class="text-orange" name="precos" label="Preços" />
                <q-tab class="text-orange" name="detalhes" label="Detalhes" />
              </q-tabs>

              <div class="q-gutter-xs">
                <q-tab-panels
                  v-model="tab"
                  animated
                  transition-prev="scale"
                  transition-next="scale"
                  class="bg-white text-grey-9 text-left"
                >
                  <q-tab-panel
                   name="produto">
                      <div class="text-h6 text-weight-regular" style="margin:20px">Dados Produto</div>
                   <q-card-section>
                   <q-form>
                      <input type="hidden" v-model="produto.id" />
                        <div class="q-gutter-sm">
                          <q-input
                            dense
                            outlined
                            v-model="produto.codigo"
                            label="codigo"
                          />
                          <q-input
                            dense
                            outlined
                            v-model="produto.produto"
                            label="Produto"
                          />
                          <q-input
                            dense
                            outlined
                            v-model="produto.descricao"
                            label="Descricao"
                          />
                          <q-select
                            dense
                            outlined
                            emit-value
                            map-options
                            v-model="produto.categoria_id"
                            :options="categorias"
                            @input="loadSubcategoria(produto.categoria_id)"
                            label="Categoria"
                            >
                              <template v-slot:append>
                                <q-icon v-if="produto.categoria_id !== ''"
                                  name="close"
                                  @click="limpaCategorias()"
                                  class="cursor-pointer"
                                />
                              </template>
                          </q-select>

                          <q-select
                            v-if="produto.categoria_id !== ''"
                            dense
                            outlined
                            emit-value
                            map-options
                            v-model="produto.subcategoria_id"
                            :options="subcategorias"
                            label="SubCategoria"
                            >
                              <template v-slot:append>
                                  <q-icon v-if="produto.subcategoria_id !== ''" name="close" @click="produto.subcategoria_id = ''" class="cursor-pointer" />
                              </template>
                          </q-select>

                          <q-select
                            dense
                            outlined
                            emit-value
                            map-options
                            v-model="produto.fornecedor_id"
                            :options="fornecedores"
                            label="Fornecedor"
                          />
                        </div>
                   </q-form>
                   </q-card-section>
                  </q-tab-panel>

                  <q-tab-panel name="precos">
                    <div class="text-h6 text-weight-regular" style="margin:20px">Preços</div>
                    <q-card-section>
                      <div class="q-gutter-md">
                        <q-input
                          dense
                          outlined
                          v-model="produto.preco_venda"
                          label="Preço Venda"
                        />
                      </div>
                    </q-card-section>
                 </q-tab-panel>

                   <q-tab-panel name="detalhes">
                    <div class="text-h6 text-weight-regular" style="margin:20px">Detalhes</div>
                      <q-card-section>
                        <div class="q-gutter-md">
                          <q-input
                          dense
                          outlined
                          v-model="produto.peso"
                          label="Peso"
                        />
                        <q-input
                          outlined
                          type="textarea"
                          v-model="produto.observacao"
                          label="Observação"
                        />
                    </div>
                    </q-card-section>
                  </q-tab-panel>
                </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<q-card-actions align="right" class="bg-white-1">
<q-btn class="q-mt-sm" color="grey" label="Fechar" @click="fechar" />
<q-btn label="Salvar" @click="salvar" type="submit" class="q-mt-sm" color="primary" />
</q-card-actions>
</q-card>
</q-dialog>
</div>

</template>

<script>
import {
  QDialog,
  QForm,
  QTabPanels,
  QTabPanel,

} from 'quasar';
import { mask } from 'vue-the-mask';
import CategoriaService from '../../service/Categoria/CategoriaService';
import SubCategoriaService from '../../service/SubCategoria/SubCategoriaService';
import FornecedorService from '../../service/Fornecedor/FornecedorService';

import ModalTitleComponent from '../../components/modal/ModalTitleComponent';


export default {
  name: 'ModalCadastroproduto',
  components: {
    ModalTitleComponent,
    QDialog,
    QForm,
    QTabPanels,
    QTabPanel,
  },
  directives: { mask },
  props: ['show', 'edit'],
  data() {
    return {
      tab: 'produto',
      produto: {},
      categorias: [],
      subcategorias: [],
      fornecedores: [],
      CategoriaService: new CategoriaService(),
      SubCategoriaService: new SubCategoriaService(),
      FornecedorService: new FornecedorService(),
    };
  },
  methods: {
    async loadSubcategoria(categoria) {
      const data = await this.SubCategoriaService.search({ categoria });
      this.subcategorias = data.data.map(item => ({ label: item.subcategoria, value: item.id }));
    },
    salvar() {
      this.$emit('salvar', this.produto);
    },
    fechar() {
      this.$emit('fechar');
    },
    async loadCategorias() {
      const data = await this.CategoriaService.list();
      this.categorias = data.map(item => ({ label: item.categoria, value: item.id }));
    },
    limpaCategorias() {
      this.produto.categoria_id = '';
      this.produto.subcategoria_id = '';
    },

    async loadFo() {
      const data = await this.FornecedorService.list();
      this.fornecedores = data.map(item => ({ label: item.fornecedor, value: item.id }));
    },
  },
  mounted() {
    this.loadCategorias();
    this.loadFo();
  },
  watch: {
    edit(newEdit) {
      this.produto = { ...newEdit };
    },
  },
};
</script>
