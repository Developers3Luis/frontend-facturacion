<template>
  <v-app>
    <app-navbar/>
    <v-container>
      <v-card style="margin-top:10em;" elevation="0" >
        <!-- ALERTA 2 -->
        <div>
          <v-alert
            v-model="alert2"
            dismissible
            color="error"
            border="left"
            elevation="24"
            colored-border
            icon="mdi-alert"
          >
            {{msgError}} <strong>{{msgError2}}</strong> {{msgError3}}
          </v-alert>
        </div>
        <!-- ALERTA 3 -->
        <div>
          <v-alert
            v-model="alert3"
            dismissible
            color="success"
            border="left"
            elevation="24"
            colored-border
            icon="mdi-check-all"
          >
            {{msgError}} <strong>{{msgError2}}</strong> {{msgError3}}
          </v-alert>
        </div>
        <v-row class="justify-center">
          <v-col md="3">
            <v-card width="500px" style="margin:0 auto;" >
              <v-card-title class="text-h6" style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">
                También puedes...
              </v-card-title>
              <v-card-text>
                <v-list class="justify-center">
                  <v-list-item-group
                    
                    color="primary"
                  >
                    <v-list-item  style="font-size:16px;"
                    ><img width="15%" src="../../public/img/factura.png" alt=""> 
                      Reimprimir tu factura
                      <v-list-item-icon>
                        
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="7">
            <v-card width="100%" max-width="840px" style="margin:0 auto; " >
              <v-card-title  class="text-h5">¡Inicia tu Factura hoy!</v-card-title>
              <v-card width="95%"  style="margin:0 auto; " elevation="5">
                <v-card-subtitle class="text-h6">
                  <span style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">Paso 1:
                  </span> Ingresa los datos de tu ticket 
                  <v-icon  @click="ticket = true" 
                  style="font-size:14px; margin-top:-15px; background: linear-gradient(blue,red); -webkit-background-clip: text;color: transparent;">
                  mdi-information-outline</v-icon></v-card-subtitle>
                <v-card-text>
                  <div class="container">
                    <v-form ref="folioventa" @submit.prevent="validarFolio(FolioVenta,fechaInicio)">
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-dialog
                              ref="dialogI"
                              v-model="modalFecha"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :disabled="btnContinuar == true"
                                  v-model="fechaInicio"
                                  label="Fecha de Venta *"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                                locale="es"
                                :short-weekdays="false"
                                v-model="fechaInicio"
                                color="#FA8072"
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="error"
                                  @click="modalFecha = false"
                                >
                                  Cancelar
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialogI.save(fechaInicio)"
                                >
                                  ACEPTAR
                                </v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              :disabled="btnContinuar == true"
                              v-model="FolioVenta"
                              :rules="[(v) => !!v || 'Folio de venta es requerido']"
                              label="Folio de Venta *"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-btn type="submit" small text color="blue">Validar folio</v-btn>
                        </v-row>
                      </v-container>
                    </v-form>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <div>
                    <v-alert
                      dense
                      v-model="alert"
                      dismissible
                      color="error"
                      border="left"
                      elevation="2"
                      colored-border
                      icon="mdi-note-alert"
                    >
                      Lo sentimos <strong>{{msgError}}</strong>. Por favor revisa tu folio de nuevo.
                    </v-alert>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn  v-if="btnContinuar == true" @click="continuar = true" text dark color="orange">CONTINUAR</v-btn>
                </v-card-actions>
              </v-card>
              
              <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="5" :disabled="continuar==false">
              <!-- <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="5" > -->
                <v-card-subtitle class="text-h6">
                  <span style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">Paso 2:
                  </span> Ingresa tu RFC</v-card-subtitle>
                  <v-card-text>
                    <div class="container">
                      <v-form ref="facturacion" @submit.prevent="comprobar = true, carga = true,mandarDatos()">
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              md="6"
                            >
                              <v-text-field
                                :rules="[(v) => !!v || 'Inserte el RFC por favor']"
                                :counter="13"
                                label="RFC"
                                required
                                v-model="factura.rfc"
                                :disabled="btnComprobarRFC == true || actualizarRFC == true"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                            ><v-btn text color="blue" 
                              style="margin-top:24px;"
                              @click="validarRFC(factura.rfc)">
                              validar RFC
                            </v-btn> 
                              <v-icon v-if="success" style="margin-top:15px" color="#02F290">mdi-check-all</v-icon>
                              <v-icon style="margin-top:15px" color="error" v-if="error">mdi-close-thick</v-icon>
                            </v-col>
                            <!-- <v-col cols="12" md="8" v-if="continuar==true">
                              <v-text-field
                              disabled
                              v-model="factura.nombre"
                              label="Nombre completo"
                              required
                              type="text"
                              :rules="[(v) => !!v || 'Es requerdio',
                                (v) => !v || /^[A-Za-z ÁÉÍÓÚáéíóú]{2,50}$/.test(v) || 'Solo letras por favor']"
                              ></v-text-field>
                            </v-col> -->
                          </v-row>
                        </v-container>
                        <v-card-actions>
                          <v-btn color="error" text v-if="actualizarRFC == true" @click="mandarDatosModalActualizar()">ACTUALIZAR RFC PARA FACTURAR</v-btn>
                          <v-btn color="green" text v-if="registrarse == true" @click="modalRegistrar = true">Registrarse</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn v-if="btnComprobarRFC == true" text color="orange" type="submit">Comprobar</v-btn>
                        </v-card-actions>
                      </v-form>
                    </div>
                  </v-card-text>
              </v-card>

              <!-- >>>>>>>> Case : Paso 3 - Empieza -->
              <template>
                <div>
                  <div v-if="modalRegistrar">
                    <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="24">
                      <v-card-title class="" >
                        <span class="text-h5" style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">Registro al portal de facturación RFV</span>
                      </v-card-title>
                      <v-divider color="yellow,"></v-divider>
                      <v-card-text>
                          <v-form ref="Paso3" @submit.prevent="actualizarYgenerarFactura(registro)">
                            <v-container>{{registro}}
                              <v-row>
                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <v-text-field  name="postal" id="postal" @change="validarCp(registro.postal)" @input="validarCp(registro.postal)"
                                      v-model="registro.postal" 
                                      onkeydown="javascript: return (event.keyCode == 69 ||event.keyCode == 109 
                                          ||event.keyCode == 107||event.keyCode == 190
                                          ||event.keyCode == 187||event.keyCode == 189 
                                          ||event.keyCode == 229||event.keyCode == 189 
                                          ) ? false : true"
                                      style="width:400px"
                                      :rules="[(v) => !!v || 'Inserte el Código Postal',
                                        (v) => (v && v.length <= 5 || 'Solo 5 números')]"
                                      type="number" :counter="5" label="Código Postal">
                                  </v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="5"
                                >
                                  <v-text-field
                                    disabled
                                    v-model="registro.pais"
                                    type="text"
                                    label="País"
                                    required
                                    :rules="[(v) => !!v  || 'Inserte el País porfavor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú]+$/.test(v) || 'Solo letras por favor',]"
                                  ></v-text-field>
                                </v-col>
                                <v-col 
                                  cols="12" 
                                  md="7"
                                  ><v-text-field
                                    class="code"
                                    :rules="[(v) => !!v ||'Inserte el Nombre de Razón Social por favor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú]+$/.test(v) || 'Solo letras por favor',]"
                                    label="Nombre de Razón Social"
                                    required
                                    v-model="registro.razonsocial"
                                    @keyup="uppercase()"
                                  ></v-text-field>

                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    :rules="[(v) => !!v || 'Inserte el RFC por favor']"
                                    :counter="10"
                                    label="RFC"
                                    required
                                    v-model="registro.rfc"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6"
                                > <v-text-field
                                type="Number"
                                label="Teléfono"
                                v-model="registro.telefono"
                                :rules="[(v)=> !!v || 'Teléfono es requerido']"
                                required
                                ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="12"
                                >
                                  <v-text-field
                                    class="code"
                                    :rules="[(v) => !!v || 'Inserte la Calle por favor']"
                                    label="Calle / N° Exterior / N° interior"
                                    required
                                    v-model="registro.calle"
                                    @keyup="uppercase()"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"
                                > <v-text-field
                                class="code"
                                label="Referencia"
                                v-model="registro.referencia"
                                @keyup="uppercase()"
                                ></v-text-field>
                                </v-col>
                                <!-- <v-col
                                  cols="12"
                                  md="6"
                                > -->
                                  <!-- <v-text-field
                                    :rules="[(v) => !!v || 'Inserte la Calle por favor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú ]{1,30}$\s*/.test(v) || 'Solo letras por favor y sin espacio al final',]"
                                    label="Calle"
                                    required
                                    v-model="registro.calle"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="3"
                                >
                                  <v-text-field
                                    :rules="[(v) => !!v || 'Inserte el Número Exterior por favor']"
                                    type="number"
                                    label="Número Exterior"
                                    required
                                    v-model="registro.numExterior"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="3"
                                >
                                  <v-text-field
                                    :rules="[(v) => !! v || 'Inserte el Número Interior']"
                                    type="number"
                                    label="Número Interior"
                                    required
                                    v-model="registro.numInterior"
                                  ></v-text-field>
                                </v-col> -->
                                <v-col
                                  cols="12"
                                  md="6"
                                > <v-select
                                      v-model="registro.asentamiento" :items="asentamientos"
                                      label="Colonia" item-text="asentamiento"
                                      item-value="asentamiento"
                                      no-data-text="No hay Colonias disponibles"
                                  ></v-select> 
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    disabled
                                    :rules="[(v) => !! v || ' Inserte la Delegación o Municipio por favor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú ]{1,30}$\s*/.test(v) || 'Solo letras por favor y sin espacio al final',]"
                                    label="Delegación / Municipio"
                                    required
                                    type="text"
                                    v-model="registro.delegacionMun"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-select
                                    style="font-size:15px; color:red;"
                                    prepend-icon="mdi-sign-real-estate"
                                    label="Estado"
                                    color="blue"
                                    :rules="[(v) => !!v || 'Estado es requerido']"
                                    v-model="registro.estado"
                                    :items="estadosMX"
                                    item-text="estadonombre"
                                    item-value="idtabla"
                                    :filter="customFilter"
                                  >
                                  <template slot="selection" slot-scope="data">
                                    {{data.item.estadonombre}} 
                                  </template>
                                  <template slot="item" slot-scope="data">
                                    {{data.item.estadonombre}} 
                                  </template>
                                  </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                  
                                  label="Celular"
                                  v-model="registro.celular"
                                  :rules="[(v) => !!v || 'Se requiere el número de celular']"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="8"
                                ><v-text-field
                                  v-model="registro.correo"
                                  label="Correo Electrónico"
                                  :rules="[(v) => !!v || 'Email es requerido',
                                           (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '¡Correo invañido!']"
                                  required
                                  ></v-text-field> </v-col>
                                <v-col
                                cols="12"
                                md="12"
                                >
                                  <v-select
                                  style="font-size:15px; color:red;"
                                  prepend-icon="mdi-hail"
                                  label="Régimen Tributario"
                                  color="blue"
                                  :rules="[(v) => !!v || 'Régimen tributario es requerido']"
                                  v-model="registro.regimen"
                                  :items="regimenTributario"
                                  item-text="regimen"
                                  item-value="idtabla"
                                  ></v-select>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="12"
                                >
                                  <v-select
                                    label="Uso del CFDI"
                                    v-model="registro.cfdi"
                                    item-text="descripcion"
                                    item-value="valor"
                                    style="width:1900px"
                                    :items="cFDI"
                                    required
                                    :rules="[(v) => !!v ||'CFDI es requerido']"
                                    > <template v-slot:prepend>
                                      <v-tooltip
                                        small
                                        color="error"
                                        bottom
                                      >
                                        <template v-slot:activator="{ on }">
                                          <v-icon class="" v-on="on" 
                                            style="font-size:16px; background: linear-gradient(blue,red); -webkit-background-clip: text;color: transparent;">
                                            mdi-help-circle-outline
                                          </v-icon>
                                        </template>
                                        Comprobante Fiscal Digital por Internet
                                      </v-tooltip>
                                    </template>
                                  </v-select>
                                  </v-col>
                                  <v-col cols="12" md="7">
                                    <v-select
                                    v-model="registro.pago"
                                    label="Forma de pago"
                                    :rules="[(v) => !!v || 'Es requerido']"
                                    :items="formasPago"
                                    item-text="formapago"
                                    item-value="idtabla"
                                    ></v-select>
                                  </v-col>
                              </v-row>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text color="blue" type="submit"> &nbsp; Registrarme  <v-icon color="blue" style="margin-left:10px;">mdi-account-plus</v-icon></v-btn>
                              <v-btn text color="error" @click="modalRegistrar = false"> &nbsp; Cancelar &nbsp; </v-btn>
                            </v-card-actions>
                          </v-form>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div>
                    <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="5" :disabled="comprobar==false? actualizarDatoRFC==false:actualizarDatoRFC==true " >
                    <!-- <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="5" > -->
                      <v-card-subtitle class="text-h6" v-if="actualizarDatoRFC==true">
                        <span style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">Paso 3:
                        </span> Actualiza tus datos
                      </v-card-subtitle>
                      <v-card-subtitle class="text-h6" v-if="comprobar==true || actualizarDatoRFC==false">
                        <span style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">Paso 3:
                        </span> Ingresa los datos de Facturación
                      </v-card-subtitle>
                      <v-card-text>
                        <div class="container">
                          <v-form ref="actualizarRFC" @submit.prevent="generarFactura(factura2,fechaHoy)">
                            <v-container>
                              <v-row>
                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <v-text-field  name="postal" id="postal" @change="validarCp(factura2.postal)" @input="validarCp(factura2.postal)" onkeyup=""
                                      v-model="factura2.postal" 
                                      onkeydown="javascript: return (event.keyCode == 69 ||event.keyCode == 109 
                                          ||event.keyCode == 107||event.keyCode == 190
                                          ||event.keyCode == 187||event.keyCode == 189 
                                          ||event.keyCode == 229||event.keyCode == 189 
                                          ) ? false : true"
                                      style="width:400px"
                                      :rules="[(v) => !!v || 'Inserte el Código Postal',
                                        (v) => (v && v.length <= 5 || 'Solo 5 números')]"
                                      type="number" :counter="5" label="Código Postal">
                                  </v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="5"
                                >
                                  <v-text-field
                                    disabled
                                    v-model="factura2.pais"
                                    type="text"
                                    label="País"
                                    required
                                    :rules="[(v) => !!v  || 'Inserte el País porfavor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú]+$/.test(v) || 'Solo letras por favor',]"
                                  ></v-text-field>
                                </v-col>
                                <v-col 
                                  cols="12" 
                                  md="7"
                                  ><v-text-field
                                    class="code"
                                    :disabled="checkboxActualizar== false"
                                    :rules="[(v) => !!v ||'Inserte el Nombre de Razón Social por favor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú ]+$/.test(v) || 'Solo letras por favor',]"
                                    label="Nombre de Razón Social"
                                    required
                                    v-model="factura2.razonsocial"
                                    @keyup="uppercase()"
                                  ></v-text-field>

                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                <v-text-field 
                                  :disabled="checkboxActualizar== false"
                                  :rules="[(v) => !!v || 'Inserte el RFC por favor',
                                          (v) => !v || /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/.test(v) || 'RFC invalido']"
                                  :counter="13"
                                  v-model="factura2.rfc"
                                  label="RFC"
                                  required
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6"
                                > <v-text-field
                                :disabled="checkboxActualizar== false"
                                type="Number"
                                label="Teléfono"
                                v-model="factura2.telefono"
                                :rules="[(v)=> !!v || 'Teléfono es requerido']"
                                required
                                ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="12"
                                >
                                  <v-text-field
                                    class="code"
                                    :disabled="checkboxActualizar== false"
                                    :rules="[(v) => !!v || 'Inserte la Calle por favor']"
                                    label="Calle / N° Exterior / N° interior"
                                    required
                                    v-model="factura2.calle"
                                    @keyup="uppercase()"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12"
                                > <v-text-field
                                class="code"
                                :disabled="checkboxActualizar== false"
                                label="Referencia"
                                v-model="factura2.referencia"
                                :rules="[(v) => !! v || 'Referencia es requerido']"
                                @keyup="uppercase()"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                <!-- <v-text-field
                                      :disabled="checkboxActualizar== false"
                                      v-if="comprobar==true || actualizarDatoRFC==false || checkboxActualizar == true"
                                      v-model="factura2.asentamiento"
                                      label="Colonia" 
                                      required
                                      :rules="[(v) => !!v || 'Colonia es requerido']"
                                  ></v-text-field>   -->
                                <v-select
                                  v-if="actualizarDatoRFC == true || checkboxActualizar== false || checkboxActualizar == true"
                                  :disabled="checkboxActualizar== false"
                                      v-model="factura2.asentamiento" :items="asentamientos"
                                      label="Colonia" item-text="asentamiento"
                                      item-value="colonia"
                                      no-data-text="No hay Colonias disponibles"
                                  ></v-select> 
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    :disabled="checkboxActualizar== false"
                                    :rules="[(v) => !! v || ' Inserte la Delegación o Municipio por favor',
                                              (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú ]{1,30}$\s*/.test(v) || 'Solo letras por favor y sin espacio al final',]"
                                    label="Delegación / Municipio"
                                    required
                                    type="text"
                                    v-model="factura2.delegacionMun"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <!-- <v-text-field
                                    v-if="comprobar==true || actualizarDatoRFC==false && checkboxActualizar== true"
                                    :disabled="checkboxActualizar== false"
                                    :rules="[(v) => !!v || 'Inserte el Estado por favor',
                                            (v) => !v || /^[A-Za-zÁÉÍÓÚáéíóú ]{1,30}$\s*/.test(v) || 'Solo letras por favor y sin espacio al final',]"
                                    label="Estado"
                                    required
                                    v-model="factura2.estado"
                                  ></v-text-field> -->
                                  <v-select
                                    :disabled="checkboxActualizar== false"
                                    v-if="actualizarDatoRFC==true || checkboxActualizar== false || checkboxActualizar== true "
                                    style="font-size:15px; color:red;"
                                    prepend-icon="mdi-sign-real-estate"
                                    label="Estado"
                                    color="blue"
                                    :rules="[(v) => !!v || 'Estado es requerido']"
                                    v-model="factura2.estado"
                                    :items="estadosMX"
                                    item-text="estadonombre"
                                    item-value="idtabla"
                                    :filter="customFilter"
                                  >
                                  <template slot="selection" slot-scope="data">
                                    {{data.item.estadonombre}} 
                                  </template>
                                  <template slot="item" slot-scope="data">
                                    {{data.item.estadonombre}} 
                                  </template>
                                  </v-select>
                                  <!-- <v-select
                                    label="Estado"
                                    :rules="[(v) => !!v || 'Inserte el Estado por favor']"
                                  ></v-select> -->
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                  :disabled="checkboxActualizar== false"
                                  label="Celular"
                                  v-model="factura2.celular"
                                  :rules="[(v) => !!v || 'Se requiere el número de celular']"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="8"
                                ><v-text-field
                                  :disabled="checkboxActualizar== false"
                                  v-model="factura2.correo"
                                  label="Correo Electrónico"
                                  :rules="[(v) => !!v || 'Email es requerido',
                                           (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '¡Correo invañido!']"
                                  required
                                  ></v-text-field> </v-col>
                                <v-col
                                cols="12"
                                md="12"
                                >
                                  <v-select
                                  :disabled="checkboxActualizar== false"
                                  style="font-size:15px; color:red;"
                                  prepend-icon="mdi-hail"
                                  label="Régimen Tributario"
                                  color="blue"
                                  :rules="[(v) => !!v || 'Régimen tributario es requerido']"
                                  v-model="factura2.regimen"
                                  :items="regimenTributario"
                                  item-text="regimen"
                                  item-value="idtabla"
                                  ></v-select>{{factura2.regimen}}
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="12"
                                >
                                  <v-select
                                    :disabled="checkboxActualizar== false"
                                    label="Uso del CFDI"
                                    v-model="factura2.cfdi"
                                    item-text="descripcion"
                                    item-value="valor"
                                    style="width:1900px"
                                    :items="cFDI"
                                    :rules="[(v) => !!v || 'CFDI es requerido']"
                                    > <template v-slot:prepend>
                                      <v-tooltip
                                        small
                                        color="error"
                                        bottom
                                      >
                                        <template v-slot:activator="{ on }">
                                          <v-icon class="" v-on="on" 
                                            style="font-size:16px; background: linear-gradient(blue,red); -webkit-background-clip: text;color: transparent;">
                                            mdi-help-circle-outline
                                          </v-icon>
                                        </template>
                                        Comprobante Fiscal Digital por Internet
                                      </v-tooltip>
                                    </template>
                                  </v-select>
                                  </v-col>
                                  <v-col cols="12" md="7">
                                    <v-select
                                    :disabled="checkboxActualizar== false"
                                    v-model="factura2.pago"
                                    label="Forma de pago"
                                    :rules="[(v) => !!v || 'Es requerido']"
                                    :items="formasPago"
                                    item-text="formapago"
                                    item-value="idtabla"
                                    ></v-select>{{factura2.pago}}
                                  </v-col>
                                  <!-- <v-col md="6">
                                    <v-switch
                                    v-if="actualizar!=false"
                                    v-model="checkbox"
                                    color="orange"
                                    label="Eligir otra dirección"
                                    @click="direccionesSociodeNegocio()"
                                    ></v-switch>
                                  </v-col> -->
                                  <v-col md="6">
                                    <v-switch
                                      v-model="checkboxActualizar"
                                      v-if="actualizar!=false"
                                      color="orange"
                                      hide-details
                                      label="Modificar mis datos"
                                      ></v-switch>
                                  </v-col>
                                  
                              </v-row>
                              <!-- <v-divider color="(red,purple)"></v-divider>
                              <div class="text-h6">ELIGE UNA FORMA DE PAGO</div>
                              <v-row>
                                <v-col>
                                  <v-card class="container text-center" max-width="200">Transferencia electrónica
                                    <v-img width="200" src="../../public/img/movil.png"></v-img>
                                  </v-card>
                                </v-col>
                                <v-divider vertical></v-divider>
                                <v-col>
                                  <v-card class="container text-center"  max-width="200">Paypal
                                    <v-img width="180" src="../../public/img/paypal.png"></v-img>
                                  </v-card>
                                </v-col>
                                <v-divider vertical></v-divider>
                                <v-col>
                                  <v-card class="container text-center">Pago en efectivo
                                    <v-img width="180" src="../../public/img/dinero.png"></v-img>
                                  </v-card>
                                </v-col>
                              </v-row> -->

                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text color="blue" v-if="checkboxActualizar==true" @click="actualizarYgenerarFactura(factura2),generarFactura(factura2,fechaHoy)"> ACTUALIZAR Y GENERAR FACTURA</v-btn>
                              <v-btn v-if="actualizarDatoRFC==true" text color="orange" type="submit">Actualizar</v-btn>
                              <v-btn v-if="comprobar==true || actualizarDatoRFC==false" :disabled="checkbox == true || checkboxActualizar == true" text color="orange" type="submit">Generar Factura</v-btn>
                            </v-card-actions>
                          </v-form>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                  <!-- >>>>>>>>> Direcciones registradas -->
                  <!-- <div>
                    <v-card class="mx-auto" width="95%" style="margin-top:5px;" elevation="5" v-if="checkbox">
                      <v-card-subtitle class="text-h6" style="background: linear-gradient(purple,orange); -webkit-background-clip: text; color:transparent;"> -->
                        <!-- <span style="background: linear-gradient(purple,orange); -webkit-background-clip: text; color:transparent;">Paso 4: 
                        </span>  -->
                        <!-- &nbsp; Selecciona otra direccción 
                      </v-card-subtitle>
                      <div class="container">
                        <div class="text-h5" justify="center" v-if=" userList ==0" dense outlined style="color:gray; text-align:center">
                            No hay direcciones registradas
                        </div> 
                        <v-radio-group v-model="direccion"   v-if="userList !=0">
                          <v-container >
                            <v-row md="9"  class="justify-center" >
                              
                                <v-card v-for="userList in userList" :key="userList.c_location_id" 
                                  width="40%"
                                  ref="form"
                                  elevation="8"
                                  class="ma-5"
                                  max-width="314"
                                  max-height=""
                                  height="">
                                  <v-img
                                    src="../../public/img/card.jpg"
                                    height="35px"
                                  ></v-img>
                                  <v-radio  :value="userList.c_location_id"></v-radio>
                                  <v-card-title style="align-text:center;">{{userList.locationname}}</v-card-title>
                                  <v-card-text>
                                    
                                    <h2 class="font-weight-light mt-1">Pa&iacute;s</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                    {{ userList.countryname }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2 class="font-weight-light mt-1">Estado</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.description }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2 class="font-weight-light mt-1">Ciudad</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.city }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2 class="font-weight-light mt-1">Colonia</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.address2 }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2 class="font-weight-light mt-1">Delegaci&oacute;n/Municipio</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.address3 }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2 class="font-weight-light mt-1">Calle</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.address1 }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    <h2  class="font-weight-light mt-1">Tel&eacute;fono</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.office_number }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                    
                                    <h2 class="font-weight-light mt-1">C&oacute;digo Postal</h2>
                                    <h4 style="font-family:Lucida, sans-serif;">
                                      {{ userList.postal }}
                                    </h4>
                                    <v-divider
                                      color="to left,cyan,red"
                                      class="mt-1"
                                    ></v-divider>
                                  </v-card-text>
                                </v-card>
                            </v-row>
                          </v-container>
                          <br>
                          <v-row justify="center" class="mx-auto">
                            <v-btn justify="center"
                              dark color="orange" text
                              @click="seleccionarDireccion()">
                              Elegir direcci&oacute;n
                            </v-btn>
                          </v-row> 
                        </v-radio-group>
                      </div>
                    </v-card> -->
                  <!-- </div> -->
                </div>
              </template>
              <!-- >>>>>>>>> Case FINALIZA -->
              <br>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <div class="container">
        <v-dialog v-model="carga" width="300" >
          <v-card class="svg">
            <div class="container" >
              <svg  width="93%" height="140px" viewBox="0 0 81 60" > 
                <rect y="0" width="13" height="50" fill="#1fa2ff">
                    <animate attributeName="height" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="19" y="0" width="13" height="50" fill="#12d8fa">
                    <animate attributeName="height" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="38" y="0" width="13" height="50" fill="#06ffcb">
                    <animate attributeName="height" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="58" y="0" width="13" height="50" fill="#1fa2ff">
                    <animate attributeName="height" values="50;10;50" begin="0.6s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.6s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="78" y="0" width="13" height="50" fill="#06ffcb">
                    <animate attributeName="height" values="50;10;50" begin="0.8s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="y" values="0;20;0" begin="0.8s" dur="1s" repeatCount="indefinite" />
                </rect>
              </svg>
            </div>
            <div class="text-h6 carga" style="color:gray; ">
              <center>
                <h5 class="carga">
                   CARGANDO
                </h5>
              </center>
            </div>
          </v-card>
        </v-dialog> 
      </div>
      
      <v-dialog v-model="ticket" width="700px" height="700px;"  id="dialog" >
        <v-card>
          <v-card-title style="background: linear-gradient(purple,orange); -webkit-background-clip: text;color: transparent;">
            Identifica tus datos para generar tu Factura
          </v-card-title>
          <v-card-text>
            <div style="text-align:center;"  class="text-h1">EJEMPLO DE IMAGEN</div>
            <!-- <v-img
            src="../../public/img/refividrio.png"
            ></v-img> -->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>


<script>
import navbar from "../components/navbar.vue";
import axios from "axios";
import config from "../../json/config.json";
import Vue from 'vue';
import VSwitch from 'v-switch-case';

Vue.use(VSwitch)
export default {
  data() {
    return {
      carga:false,
      rfc:"",
      ticket: false, // modal para mostrar imagen de ticket para llenar datos
      alert:false,
      alert2:false,
      alert3:false,
      fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modalFecha: false,
      FolioVenta:'', //Guarda el folio de venta insertado, en Paso 1
      btnContinuar:false,
      btnComprobarRFC:false,
      factura:{ colonia:"",
                postal:"",
                estado:"",
                ciudad:"",
                delegacionMun:"",
                pais:"",
                asentamiento : "",
                cfdi:"",
              },
      factura2:{ colonia:"",
        postal:"",
        estado:"",
        ciudad:"",
        delegacionMun:"",
        pais:"",
        asentamiento : "",
        cfdi:"",
        regimen:"",
        pago:""
      },
      continuar:false, //Habilita el Paso 2
      comprobar:false, //Habilita y muestra el Paso 3
      alert:false,
      success:false,// Muestra la validacion success del RFC
      error:false,// Muestra la validacion error del RFC
      actualizarDatoRFC:false,//Muestra el model para actualizar RFC
      asentamientos:[],
      error: {cp:""},
      cFDI:[], //Registros del CFDI en etiqueta select
      validacionOrder:[],
      validacionFolioventa:[],
      actualizarRFC:false,
      registrarse:false, //Muestra el boton de registrar
      modalRegistrar:false,
      registro:{
        colonia:"",
        postal:"",
        estado:"",
        ciudad:"",
        delegacionMun:"",
        pais:"",
        asentamiento : "",
        cfdi:"",
      },
      msgError:"", //mensaje
      msgError2:"", //mensaje
      msgError3:"", //mensaje
      arrayRegistro:{},
      estadosMX:[],
      userList:[],
      checkbox:false, //Elegir dirección
      checkboxActualizar:false,
      user:{},
      direccion:'',
      direccionSelect:[],
      array:{},
      array2:{},
      regimenTributario:[],
      formasPago:[],
      fechaHoy: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      vOrden_ID : 0,
      vSocio_ID : 0,
      vDireccion_ID : 0,
      vOrganizacion_ID : 0,
      mayusculas:"",
      dia:new Date(),
      validarEntrega:[],
    }
  },
  async mounted () {
    // console.log(this.fechaHoy);
    this.comprobanteFiscal();
    this.getEstado();
    this.getregimenTributario();
    this.formasdePago();
  },
  components:{
    'app-navbar':navbar,
  },
  methods: {
    async validarFolio(FolioVenta,fechaInicio){
      let valid = this.$refs.folioventa.validate()
      if(valid){
        this.carga = true;
        // this.cargaImagen();
        const folio = this.FolioVenta;
        // var regExp =  /\bOV([0-9]{2})\-([0-9]{1})\-([0-9]{1})\b/
        var regExp =  /\b^OV([0-9]{1,3})\-([0-9]{1,10})\b/;
        const resultado = regExp.test(folio);
        if (resultado == true){
          await this.validarFolioventa2(FolioVenta,fechaInicio);
          if(this.validacionFolioventa == false || this.validacionFolioventa.status == 'information'){
            console.log("Error");
          }else{
              if(this.validacionFolioventa.message[0].documento){
                console.log('EXISTE FOLIO');
                this.validarPaso2();
                this.alert = false;
                this.alert2 = false;
                this.msgError = "";
              }else{
                this.alert2 = true
                this.btnContinuar = false
                this.msgError ="No existe el folio de venta";
                window.scrollTo(0,0);
              }

            }
        }else{
          this.alert = true;
          this.msgError = '¡ Folio invalido !'
          // console.log('Incorrecto');
          this.btnContinuar = false;
        }
        setTimeout(() => this.carga=false, 3000);
        // this.carga=false

      }
    },
    validarPaso2(){
      this.btnContinuar = true
    },
    validarPaso3(){
      this.btnComprobarRFC = true;
    },
    async validarRFC(rfc){
      console.log(rfc);
      const RFC = this.factura.rfc;
      var regExp = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
      const resultado = regExp.test(RFC);
      console.log(resultado);
      if(resultado == true){
        this.success = true;
        this.error = false;
        // this.validarPaso3();
        console.log(rfc,'folio order');
        await this.validarFolioOrder(rfc);
        this.success = false;
        this.error = false;
      }else{
        this.error = true;
        this.success = false;
        this.btnComprobarRFC = false;
      }
      // console.log(resultado);
    },
    async generarFactura(){
      let valid = this.$refs.facturacion.validate();
      if(valid){

      }
    },
    async validarCp(postal){
            // this.registro.postal =this.factura2.postal;
            this.factura2.postal = postal;
            this.msgError = "";
            this.asentamientos = [];
            this.factura2.colonia = "";
            // this.factura2.estado = "";
            this.factura2.ciudad = "";
            this.factura2.delegacionMun = "";
            this.factura2.pais = "";
            this.registro.pais = "";
            this.registro.delegacionMun = "";
            // this.error.cp = "";
            if (this.factura2.postal != "") {
                if (this.factura2.postal.length!=5){
                    this.alert2=true;
                    this.msgError = "El Código Postal ingresado es Inválido.";
                    return false;
                }
                this.isLoad = true;
                let uriCp = `https://api.copomex.com/query/info_cp/${this.factura2.postal}?token=3bda8a59-91e8-4b44-a534-1761a6e60335`;
                await axios.get(uriCp)
                .then(res=>{
                    try {
                        this.alert2 = false;
                        this.factura2.estado = res.data[0].response.estado;
                        this.factura2.ciudad = res.data[0].response.ciudad;
                        this.factura2.delegacionMun = res.data[0].response.municipio;
                        this.factura2.pais = res.data[0].response.pais;
                        this.registro.pais = res.data[0].response.estado;
                        this.registro.delegacionMun = res.data[0].response.ciudad;
                        // this.registro.estado = res.data[0].response.municipio;
                        this.registro.ciudad = res.data[0].response.pais;
                        for (let index = 0; index < res.data.length; index++) {
                            const element = res.data[index];
                            this.asentamientos.push(element.response);
                        } 
                        document.getElementById("postal").blur();
                    } catch (error) {
                        document.getElementById("postal").blur();
                        this.alert2=true;
                        this.msgError = "Existe un error con tu Código Postal.";
                        // this.error.cp = "Existe un error con este Código Postal.";
                        return false;
                    } 
                }).catch(err=>{ 
                    console.log(err);
                    document.getElementById("postal").blur(); 
                    this.alert2 = true;
                    this.msgError = "El Código Postal ingresado es Inválido.";
                    // this.error.cp = "El Código Postal ingresado es Inválido.";
                    window.scrollTo(0,0);
                    return false;
                });   
            }
    },
    async comprobanteFiscal(){
      // await axios.get(config.ApiFactura + '')
      await axios.get(config.apiFactura +'/cfdi',
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.cFDI = res.data;
        // console.log(this.cFDI, 'CFDI');
      }).catch(err=>{
        return err
      })
    },

    async validarFolioventa2(FolioVenta,fechaInicio){
      // await axios.post(config.apiFactura + `/buscarOrden?documento=${FolioVenta}&fecha=${fechaInicio}`,
       const params = JSON.stringify({
              'documento': `${FolioVenta}`,
              'fecha': `${fechaInicio}`
      });
      await axios.post(config.apiFactura + `/buscarOrden`,params,
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.validacionFolioventa = res.data;
        console.log(this.validacionFolioventa,'buscarOrden');
      }).catch(err=>{
        // console.log(err);
        return false
      })
      if(this.validacionFolioventa.status == "failed" || this.validacionFolioventa == false){
        this.alert2 = true;
        this.msgError = "Ocurrio un error, intentalo de nuevo ó "
        this.msgError2 = "Revisa tu conexión"
      }else if(this.validacionFolioventa.status == 'information'){
        this.alert2 = true;
        this.msgError = this.validacionFolioventa.message
        // this.msgError2 = "Revisa tu conexión"
        this.carga = false
      
      }else if(this.validacionFolioventa.status == 'success'){
        // this.factura.rfc = this.validacionFolioventa.message[0].rfc;
        // this.factura.nombre = this.validacionFolioventa.message[0].razonsocial; 
      }
    },

    async validarFolioOrder(rfc){
     

      const params = JSON.stringify({
        'rfc':`${rfc}`
      })
      await axios.post(config.apiFactura + `/buscarSocioNegocio`,params,
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.validacionOrder = res.data;
        console.log(this.validacionOrder,'RFC');
      }).catch(err=>{
        console.log(err);
        return false
      })
      // if(this.validacionOrder == false){
      if(this.validacionOrder.action=="create"){
        // console.log("OCURRIO UN ERROR");
        this.btnComprobarRFC = false;
        this.error = true
        this.alert2 = true
        this.msgError="Tus datos no se encontraron en el "
        this.msgError2="Portal de facturación"
        this.msgError3="- Debes registrarte."
        window.scrollTo(0,0);

        this.registrarse = true;
      }else if(this.validacionOrder.action == "nothing-update"){
        this.btnComprobarRFC = true;
        this.actualizarRFC = false;
      
        // if(this.validacionFolioventa.message[0].rfc =='XAXX010101000' && this.validacionFolioventa.message[0].razonsocial == 'CLIENTE MOSTRADOR' ){
        //   console.log('CLIENTE MOSTRADOR');
        //   this.btnComprobarRFC = false;
        //   // this.error = tr  ue
        //   this.alert2 = true
        //   this.msgError="Tus datos no se encontraron en el "
        //   this.msgError2="Portal de facturación"
        //   this.msgError3="Debes registrarte."
        //   this.registrarse = true;
        //   window.scrollTo(0,0);
        // }else{
        //   this.actualizarRFC = true;
        //   this.btnComprobarRFC = false;
        // }
              
        
        // let nombre = this. 
        // for (let index = 0; index < this.validacionOrder.length; index++) {
          // const element = this.validacionOrder.datos.rfc;
          // const element2 = this.validacionOrder.datos.razonsocial;
          // console.log(params);
          //   if(rfc == element && this.factura.nombre == element2){
          //     console.log('SOCIO ENCONTRADO');
          //     if(rfc == 'XAXX010101000'){
          //       if(rfc == 'XAXX010101000' && element2 == 'CLIENTE MOSTRADOR' ){
          //         console.log('CLIENTE MOSTRADOR');
          //         this.btnComprobarRFC = false;
          //         // this.error = true
          //         this.alert2 = true
          //         // this.msgError="Tus datos no se encontraron en el "
          //         // this.msgError2="Portal de facturación"
          //         this.msgError3="Debes registrarte."
          //         this.registrarse = true;
          //         window.scrollTo(0,0);
          //       }else{
          //         this.actualizarRFC = true;
          //         this.btnComprobarRFC = false;
          //       }
          //     }else{
          //       this.btnComprobarRFC = true;
          //       this.actualizarRFC = false;
          //     }
          //   }
        // }
      }else if(this.validacionOrder.action == "update"){
            this.actualizarRFC = true;
            this.btnComprobarRFC = false;
      }else{
        this.btnComprobarRFC = true;
          this.actualizarRFC = false;
      }
      
    },
    async actualizar(){
      
      let valid =this.$refs.actualizarRFC.validate();
      if(valid){
        this.carga = true;
        await axios.put(config.apiFactura + '/')
        .then(res=>{
          return res.data;
        }).catch(err=>{
          return err
        })
        this.actualizarRFC = false
        this.$refs.actualizarRFC.reset();
        this.actualizarDatoRFC = false;
        setTimeout(() => this.carga=false, 3000);
        this.alert3= true;
        this.msgError = "Tus datos fueron actualizados, en el paso 2: ¡Ingresa tu ";
        this.msgError2 = "RFC Actualizada!";
        window.scrollTo(0,0);
      }
    },
    async registroOrden(){
      await axios.post(config.apiFactura + '/crearSocioNegocio')
      .then(res=>{
        this.arrayRegistro = res.data;
      }).catch(err=>{
        console.log(err);
        return false
      })
    },
    mandarDatos(){ // es validacionFolioventa , para ejemplo es validacionOrder porque no manda los datos necesarios
      this.factura2.rfc = this.validacionOrder.datos[0].rfc;
      this.factura2.calle = this.validacionOrder.datos[0].calle;
      this.factura2.razonsocial = this.validacionOrder.datos[0].razonsocial;
      this.factura2.correo = this.validacionOrder.datos[0].correo;
      this.factura2.postal = this.validacionOrder.datos[0].codigopostal;
      this.factura2.cfdi = this.validacionOrder.datos[0].usocfdi;
      this.factura2.delegacionMun = this.validacionOrder.datos[0].municipio;
      this.factura2.asentamiento = this.validacionOrder.datos[0].colonia;
      this.factura2.pais = this.validacionOrder.datos[0].pais;
      this.factura2.estado = this.validacionOrder.datos[0].codigoestado;
      this.factura2.regimen = this.validacionOrder.datos[0].regimentriburario;
      this.factura2.pago = this.validacionOrder.datos[0].formapago;
      this.factura2.referencia = this.validacionOrder.datos[0].referencia;
      setTimeout(() => this.carga=false, 3000);

    },
    mandarDatosModalActualizar(){
      this.carga = true;
      setTimeout(() => this.carga=false, 3000);
      this.actualizarDatoRFC = true;
      this.factura2.rfc = this.validacionFolioventa[0].rfc;
      this.factura2.calle = this.validacionFolioventa[0].calle;
      this.factura2.razonsocial = this.validacionFolioventa[0].razonsocial;
      this.factura2.correo = this.validacionFolioventa[0].correo;
      this.factura2.postal = this.validacionFolioventa[0].codigopostal;
      this.factura2.cfdi = this.validacionFolioventa[0].nombreusocfdi;
      this.factura2.delegacionMun = this.validacionFolioventa[0].municipio;
      this.factura2.asentamiento = this.validacionFolioventa[0].colonia;
      this.factura2.pais = this.validacionFolioventa[0].pais;
      this.factura2.c_region_id = this.validacionFolioventa[0].c_region_id;
      
    },
    async getEstado(){
      await axios.get(config.apiFactura + '/estadosMexico',
      {headers: {"Api-Key":"[SVR_@3d524a53c110e4c22463b10ed32cef9d]"}})
      .then(res=>{
        this.estadosMX = res.data;
        // console.log(this.estadosMX);
      }).catch(error=>{
        return error
      })
    }, 
    customFilter(item,queryText){
      const textOne = item.fuction.toLowerCase();
      const textTwo = item.fuction.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
      )
    },
    async direccionesSociodeNegocio(ad_user_id){
      ad_user_id = 1011729
      await axios.get(config.apiAdempiere + `/user/userAddress/portalFactura/${ad_user_id}`)
      .then(res=>{
        this.userList = res.data;
        console.log(this.userList);
      }).catch(err=>{
        console.log(err);
      })
    },
    seleccionarDireccion(){
      if(this.direccion == 0){
        this.alert2= true;
        this.msgError2="Por favor selecciona una dirección";
        window.scrollTo(0,0);
      }else{
        this.msgError="";
        this.alert2= false;
        this.mostrarDireccionseleccionada(this.direccion);

      }
    },
    //>>>>>>>>> Manda los datos al paso 3 actualizando la dirección 
    async mostrarDireccionseleccionada(direccion){
      await axios.get(config.apiAdempiere + `/user/mDireccion/portalFactura/${direccion}`)
      .then(res=>{
        this.direccionSelect = res.data;
        console.log(this.direccionSelect);
      }).catch(err=>{
        return err ,false
      })
      if(this.direccionSelect == false){
        this.msgError="Error"
      }else{
        this.carga = true;
        setTimeout(() => this.carga=false, 2000);
        // this.direccionSelect
        // this.factura2.rfc = this.validacionFolioventa[0].rfc;
        this.factura2.calle = this.direccionSelect.calle;
        this.factura2.nombreRS = this.direccionSelect.razonsocial;
        this.factura2.correo = this.direccionSelect.correo;
        this.factura2.postal = this.direccionSelect.postal;
        this.factura2.cfdi = this.direccionSelect.nombreusocfdi;
        this.factura2.delegacionMun = this.direccionSelect.municipio;
        this.factura2.asentamiento = this.direccionSelect.colonia;
        this.factura2.pais = this.direccionSelect.pais;
        this.factura2.estado = this.direccionSelect.estado;
        this.checkbox = false;
      }
    },
    async actualizarCFDI(){
      
      this.array.id_socionegocio = this.validacionFolioventa[0].c_bpartner_id;
      this.array2.cfdi = this.factura2.cfdi;
      const params = JSON.stringify({
              'id_socionegocio': '1013062',
              'cfdi': 'G02'
      });
      // console.log(this.array);
      // var array = JSON.stringify(this.validacionFolioventa[0].c_bpartner_id)
      // var array2 = JSON.stringify(this.factura2.cfdi)
      await axios.put(config.apiFactura + `/actualizaCFDISocioNegocio`, params, {
      headers: {
          'content-type': 'application/json',
      },})
      .then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    async getregimenTributario(){
      await axios.get(config.apiFactura + '/regimenTriburario',
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.regimenTributario = res.data;
        // console.log(this.regimenTributario,'regimen' );
      }).catch(err=>{
        return err
      })
    },

    async formasdePago(){
      await axios.get(config.apiFactura + '/formasPago',
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.formasPago = res.data;
        // console.log(this.formasPago,'PAGO');
      }).catch(err=>{return err})
    },
    async actualizarYgenerarFactura(factura2){
   
      const params = JSON.stringify({
        "razonsocial" : `${factura2.razonsocial.toUpperCase()}`
        ,"rfc" : `${factura2.rfc}`
        ,"cfdi" : `${factura2.cfdi}`
        ,"calle": `${factura2.calle.toUpperCase()}`
        ,"colonia": `${factura2.asentamiento}` 
        ,"municipio" : `${factura2.delegacionMun}`
        ,"referencia" : `${factura2.referencia.toUpperCase()}`
        ,"codigopostal": `${factura2.postal}`
        ,"telefono" : `${factura2.telefono}`
        ,"celular" : `${factura2.celular}`
        ,"correo" : `${factura2.correo}`
        ,"estado": `${factura2.estado}`
        ,"regimentributario" : `${factura2.regimen}`
        ,"formapago": `${factura2.pago}`
      });
      console.log(params);
    
      await axios.post(config.apiFactura + '/SocioNegocio',params,
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{console.log(res.data); })
      .catch(err=>{return err})
    },

    async generarFactura(factura2,fechaHoy){
      let valid = this.$refs.Paso3.validate()
      if (valid) {
        await this.buscarEntrega();
        if(this.validarEntrega == ''){

        } else if(this.validarEntrega == 'success'){
          let vOrden_ID = this.validacionFolioventa.message[0].c_order_id;
          let vSocio_ID = this.validacionFolioventa.message[0].c_bpartner_id;
          let vDireccion_ID = this.validacionOrder.datos[0].c_location_id;
          let vOrganizacion_ID = this.validacionFolioventa.message[0].ad_org_id;
          const vCFDI = factura2.cfdi;
          const vFechaFactura = fechaHoy;
          const vFormaPago = factura2.pago;
    
          const params2 = JSON.stringify({
            "vOrden_ID" : `${vOrden_ID}` 
            ,"vSocio_ID" :  `${vSocio_ID}` 
            ,"vDireccion_ID" : `${vDireccion_ID}`  
            ,"vOrganizacion_ID":  `${vOrganizacion_ID}`
            ,"vCFDI": `${vCFDI}`
            ,"vFechaFactura" : `${vFechaFactura}`
            ,"vFormaPago" : `${vFormaPago}`
          })
    
          console.log(params2);
          await axios.post(config.apiFactura + '/factura',params2,
          {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
          .then(res=>{console.log(res.data);})
          .catch(err=>{console.log(err);})
        }
  
        
        
      }
      
      
    },
    async buscarEntrega(){
      const vorden_id = this.validacionFolioventa.message[0].c_order_id;
      const vsocio_id = this.validacionFolioventa.message[0].c_bpartner_id;
      const vdireccion = this.validacionOrder.datos[0].c_location_id;

      await axios.get(config.apiFactura + `/buscarEntrega?vOrden_ID=${vorden_id}&vSocio_ID=${vsocio_id}&vDireccion_ID=${vdireccion}`,
      {headers:{'Api-Key': '[SVR_@3d524a53c110e4c22463b10ed32cef9d]'}})
      .then(res=>{
        this.validarEntrega = res.data;
        console.log(res.data)
      }).catch(err=>{return err})
    },
    uppercase(){
      this.mayusculas = this.mayusculas.toLowerCase();
    }
  },
};
</script>