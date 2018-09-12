<template>
  <q-layout>
		<q-page class="login flex flex-center full-heigth">
   
	  <q-card class="login-card">
			<q-card-main>
				<div class="flex flex-center">
					<img src="statics/logo.png" alt="">
				</div>
				<form>
					<q-field
						icon="account_circle"
					>
						<q-input v-model="username" float-label="Usuario" />
					</q-field>
					<q-field
						icon="lock"
					>
						<q-input v-model="password" type="password" float-label="Senha" />					
					</q-field>
				<br>
				<br>
				<q-btn
				@click="login"
				rounded
				icon="check_circle"
				color="primary"
				label="Entrar"
				class="full-width"
				/>
				<p></p>
				<div class="flex flex-center ">
					<p>Não tem uma conta? <a href="">Cadastre-se.</a></p>
				</div>
				</form>
			</q-card-main>
	  </q-card>
  </q-page>
	</q-layout>
</template>

<script>
	import api from '../services/auth/api'
	
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				const { username, password } = this;
				api.getToken(username, password).then( data => {
					console.log(data)
				})
			}
		}
	}
	
</script>

<style>
	.login {
	  background: linear-gradient(45deg, rgb(100, 168, 121) 0%, rgb(53, 155, 172) 40%, rgb(52, 152, 185) 60%, rgb(71, 160, 152) 100%);
	}
	.login-card {
		background-color: #fff;
	}
</style>
