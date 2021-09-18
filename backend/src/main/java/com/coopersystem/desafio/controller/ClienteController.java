package com.coopersystem.desafio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coopersystem.desafio.exception.ResourceNotFoundException;
import com.coopersystem.desafio.model.Cliente;
import com.coopersystem.desafio.repository.ClienteRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class ClienteController {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@GetMapping("/clientes")
	public List<Cliente> getAllClientes () {
		return clienteRepository.findAll();
	}
	
	@PostMapping("/clientes")
	public Cliente createCliente (@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}
	
	@PostMapping("/clientes/{id}")
	public ResponseEntity<Cliente> getClienteById (@PathVariable Long id) {
		Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cliente not found"));
		return ResponseEntity.ok(cliente);
	}
	
	@PutMapping("/clientes/{id}")
	public ResponseEntity<Cliente> updateCliente (@PathVariable Long id, @RequestBody Cliente _cliente) {
		Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cliente not found"));
		
		cliente.setNome(_cliente.getNome());
		cliente.setCpf(_cliente.getCpf());
		cliente.setEndereco(_cliente.getEndereco());
		cliente.setTelefones(_cliente.getTelefones());
		cliente.setEmail(_cliente.getEmail());
		
		Cliente updatedCliente = clienteRepository.save(cliente);
		
		return ResponseEntity.ok(updatedCliente);
	}

}
