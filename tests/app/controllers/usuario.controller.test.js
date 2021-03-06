const {Service} = require('../../../src/app/services/usuario.service');
const {Controller} = require('../../../src/app/controllers/usuario.controller');
const { request, response } = require('express');

test("post de usuario", async () => {
    expect(await Controller.post({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"})).toContain({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.post({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"})).toContain({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
    expect(await Controller.post({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"})).toContain("Usuário já existe");
    expect(await Controller.post({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"})).toContain("Usuário já existe");
});

test("get usuarios", async () =>{
    expect(await Controller.get()).toHaveLength(0);
    const u1 = await Service.create({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.get()).toHaveLength(1);
    const u2 = await Service.create({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
    expect(await Controller.get()).toHaveLength(2);
});

test("get usuarios por id", async () => {
    const u1 = await Service.create({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    const u2 = await Service.create({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
    expect(await Controller.getById(113413)).toContain("Usuário não encontrado");
    expect(await Controller.getById(1)).toContain(u1);
    expect(await Controller.getById(2)).toContain(u2);
});
test("put usuario", async () =>{
    const u1 = await Service.create({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.put({id:1, data:{nome:"Viktor"}})).toContain({nome:"Viktor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.put({id:12356434, data:{nome:"Viktor"}})).toContain('Usuário não encontrado');
});
test("deleta usuario por id", async () =>{
    expect(await Controller.deleteById(12523)).toContain('Usuário não encontrado');
    const u1 = await Service.create({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.deleteById(1)).toContain({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.deleteById(1)).toContain('Usuário não encontrado');
});
test("login de usuario", async () =>{
    expect(await Controller.login("abacaxi@gmail.com", "12345678")).toContain('Email ou senha inválidas');
    const u1 = await Service.create({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.login("vitor@gmail.com", "12345678")).toContain(u1);
    expect(await Controller.login("vitor@gmail.com", "iufdwghfiuw")).toContain('Email ou senha inválidas');
    expect(await Controller.login("vykthor@gmail.com", "12345678")).toContain('Email ou senha inválidas');
});


test("teste geral", async () =>{
    expect(await Controller.get()).toHaveLength(0);

    expect(await Controller.post({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"})).toContain({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.get()).toHaveLength(1);

    expect(await Controller.post({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"})).toContain({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
    expect(await Controller.get()).toHaveLength(2);

    expect(await Controller.getById(1)).toContain({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.getById(2)).toContain({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});

    expect(await Controller.login("victor@gmail.com", "12345678")).toContain({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
    expect(await Controller.login("vitor@gmail.com", "12345678")).toContain({nome:"Vitor", email: "vitor@gmail.com", senha: "12345678", cargo:"aluno"});

    expect(await Controller.put({id:1, data:{email:"vitor.diniz@gmail.com"}})).toContain({nome:"Vitor", email: "vitor.diniz@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.login("vitor@gmail.com", "12345678")).toContain({ error: 'Email ou senha inválidas' });
    expect(await Controller.login("vitor.diniz@gmail.com", "12345678")).toContain({nome:"Vitor", email: "vitor.diniz@gmail.com", senha: "12345678", cargo:"aluno"});
    
    expect(await Controller.deleteById(1)).toContain({nome:"Vitor", email: "vitor.diniz@gmail.com", senha: "12345678", cargo:"aluno"});
    expect(await Controller.deleteById(1)).toContain('Usuário não encontrado');
    expect(await Controller.deleteById(2)).toContain({nome:"Victor", email: "victor@gmail.com", senha: "12345678", cargo:"professor"});
});