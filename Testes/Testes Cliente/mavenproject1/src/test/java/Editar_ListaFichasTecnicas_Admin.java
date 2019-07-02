/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.After;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

/**
 *
 * @author LittleChinese
 */
public class Editar_ListaFichasTecnicas_Admin {

    WebDriver driver;

    @Before
    public void home() throws Exception {
        driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);

        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
        Thread.sleep(1000);

        driver.findElement(By.name("email")).sendKeys("admin@admin.admin");
        driver.findElement(By.name("password")).sendKeys("admin");

        driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();
        Thread.sleep(1000);
        

    }

    @Test
    public void ListaFichasTecnicas_procurar_EditarDescricao_Erro() throws Exception {
       
     driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000); 
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[2]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
       
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
        Thread.sleep(1000);
       WebElement dimensao = driver.findElement(By.name("dimensions"));
        dimensao.clear();
        dimensao.sendKeys("2x3x2");
          WebElement outras_dimensoes = driver.findElement(By.name("other_dimensions"));
            outras_dimensoes.clear();
         outras_dimensoes.sendKeys("1x1x1");
       WebElement tipo =  driver.findElement(By.name("tipology"));
       tipo.clear();
       tipo.sendKeys("teste");
       WebElement site = driver.findElement(By.name("site"));
       site.clear();
       site.sendKeys("Local");
       
        Select prop = new Select (driver.findElement(By.name("owner")));
        prop.selectByValue("3");
         Thread.sleep(1000);
                
        Select owner = new Select (driver.findElement(By.name("object_owner")));
        owner.selectByValue("1");
         Thread.sleep(1000);
         
        Select patron = new Select (driver.findElement(By.name("patron")));
        patron.selectByValue("4");
         Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"datasheet_part2\"]/app-datasheet-page2/div[5]/div[2]/button")).click();
    
        //Não chego a testar os contactos devido a mensagem erro cometido de preposito
       /*  WebElement nome = driver.findElement(By.name("contact_name"));
        nome.clear();
        nome.sendKeys("Joao");
         WebElement email = driver.findElement(By.name("contact_email"));
         email.clear();
         email.sendKeys("aluno1532@ipt.pt");
         WebElement morada = driver.findElement(By.name("contact_address"));
         morada.clear();
         morada.sendKeys("Rua de Coimbra");
         WebElement telemovel = driver.findElement(By.name("contact_phone"));
         telemovel.clear();
         telemovel.sendKeys("928632694");
          driver.findElement(By.xpath("//*[@id=\"modal_contacts\"]/div/div/form/div[3]/button[2]")).click();
          Thread.sleep(1000);
        */
       WebElement msg = driver.findElement(By.className("alert-warning"));
           if (!msg.isDisplayed())
           fail("not save");
    }
   
  
    
    @After
    public void ListaFichasTecnicas_procurar_Editarcorreto() throws Exception {
       
        driver.get("http://brandic.devll.eu:61080/");
       driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000); 
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[2]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
       
       WebElement dimensao = driver.findElement(By.name("dimensions"));
        dimensao.clear();
        dimensao.sendKeys("2x3x2");
          WebElement outras_dimensoes = driver.findElement(By.name("other_dimensions"));
            outras_dimensoes.clear();
         outras_dimensoes.sendKeys("3x2x1");
       WebElement tipo =  driver.findElement(By.name("tipology"));
       tipo.clear();
       tipo.sendKeys("teste2");
       WebElement site = driver.findElement(By.name("site"));
       site.clear();
       site.sendKeys("Local");
       
        Select prop = new Select (driver.findElement(By.name("owner")));
        prop.selectByValue("3");
         Thread.sleep(1000);
                
        Select owner = new Select (driver.findElement(By.name("object_owner")));
        owner.selectByValue("1");
         Thread.sleep(1000);
         
        Select patron = new Select (driver.findElement(By.name("patron")));
        patron.selectByValue("2");
         Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"datasheet_part2\"]/app-datasheet-page2/div[5]/div[2]/button")).click();
     Thread.sleep(1000);
        //Contacto
        WebElement nome = driver.findElement(By.name("contact_name"));
        nome.clear();
        nome.sendKeys("Guimo");
         WebElement email = driver.findElement(By.name("contact_email"));
         email.clear();
         email.sendKeys("aluno000@ipt.pt");
         WebElement morada = driver.findElement(By.name("contact_address"));
         morada.clear();
         morada.sendKeys("Rua Coimbra ");
         WebElement telemovel = driver.findElement(By.name("contact_phone"));
         telemovel.clear();
         telemovel.sendKeys("920541226");
         
        driver.findElement(By.xpath("//*[@id=\"modal_contacts\"]/div/div/form/div[3]/button[2]")).click();
        Thread.sleep(1000);

                    
       WebElement msg = driver.findElement(By.xpath("//*[@id=\"modal_contacts\"]/div/div/form/div[2]/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
        
  
}
    
    
    @After 
    public void ListaFichasTecnicas_EditarCaracteristicas() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
           driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[3]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        WebElement type = driver.findElement(By.name("set_type"));
        type.clear();
        type.sendKeys("Retàbulo-mor");
        
         WebElement elemento = driver.findElement(By.name("set_elements"));
         elemento.clear();
         elemento.sendKeys("representação vegetalista de uma grinalda de folhas e ramos de videira e flores variadas em todo o fuste da coluna");
        
         WebElement material = driver.findElement(By.name("set_materials"));
         material.clear();
         material.sendKeys("Elementos decorativos de vidro colorido (não presentes durante a intervenção)");
     
         WebElement inscricao = driver.findElement(By.name("set_inscriptions"));
         inscricao.clear();
         inscricao.sendKeys("não apresenta");
         
        WebElement montagem = driver.findElement(By.name("set_mount"));
        montagem.clear();
        montagem.sendKeys("existentes- inscrições com tinta ferrogálica");
        
        WebElement construcao  = driver.findElement(By.name("set_build"));
        construcao.clear();
        construcao.sendKeys("existentes- marcas de ferramentas de corte (goivas e formões) na base, no topo, e no interior da coluna");
       
        WebElement classificacao = driver.findElement(By.name("classification"));
        classificacao.clear();
        classificacao.sendKeys("Nacional");
    
            Select epoca = new Select (driver.findElement(By.name("period")));
       epoca.selectByValue("4");
         Thread.sleep(1000);
         
     WebElement estilo = driver.findElement(By.name("style"));
        estilo.clear();
        estilo.sendKeys("estilo nacional");
            
    Select qualidade = new Select (driver.findElement(By.name("quality")));
       qualidade.selectByValue("5");
         Thread.sleep(1000);
         
    WebElement estrutura = driver.findElement(By.name("materials_structure"));
    estrutura.clear();
    estrutura.sendKeys("Madeira de carvalho");
    
    WebElement superficie = driver.findElement(By.name("materials_surface"));
    superficie.clear();
    superficie.sendKeys("cola animal (encolagem); preparação branca (cola animal + gesso ou cré); bolo da Arménia (argila vermelha + cola animal); folha de ouro; cera/resina");
    
    WebElement elementoacessorio = driver.findElement(By.name("materials_elementsAccessories"));
    elementoacessorio.clear();
    elementoacessorio.sendKeys("  ");
   
    WebElement tecnica_estrutura = driver.findElement(By.name("techniques_structure"));
    tecnica_estrutura.clear();
    tecnica_estrutura.sendKeys("entalhe");
    
    WebElement tecnica_superficie = driver.findElement(By.name("techniques_surface"));
    tecnica_superficie.clear();
    tecnica_superficie.sendKeys("douramento brunido");
    
    WebElement tecnica_acessorios = driver.findElement(By.name("techniques_elementsAccessories"));
    tecnica_acessorios.clear();
    tecnica_acessorios.sendKeys("   ");
    
    WebElement small = driver.findElement(By.name("small_description"));
    small.clear();
    small.sendKeys("Coluna pseudo-salomónica ou torsa, oca no seu interior, com um capitel compósito, e fuste de decoração vegetalista com uma grinalda de folhas e flores assim como uma águia no centro");
   WebElement analogias = driver.findElement(By.name("analogies"));
   analogias.clear();
   analogias.sendKeys("Coluna do retábulo da Igreja Matriz de Santo Varão, Montemor-o-Velho; coluna do retábulo da Igreja de Nossa Senhora do Enxertado, Mondim da Beira, Tarouca");
    
   WebElement conclusoes = driver.findElement(By.name("conclusions"));
   conclusoes.clear();
   conclusoes.sendKeys("Coluna torsa de um retábulo de \"estilo nacional\", de finais do séc. XVII inícios do séc. XVIII de muito boa qualidade de execução");
    
   WebElement autoria = driver.findElement(By.name("author"));
   autoria.clear();
   autoria.sendKeys("s/d");
   
    WebElement datacao = driver.findElement(By.name("dating"));
    datacao.clear();
    datacao.sendKeys("Finais séc. XVII, inícios séc. XVIII");
     
    WebElement origem = driver.findElement(By.name("origin"));
    origem.clear();
    origem.sendKeys("Portugal, Lisboa");
   Thread.sleep(1000);
   
    driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
     Thread.sleep(1000);
     
       driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
     Thread.sleep(1000);
     

     WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
         
     
 }
         @After
    public void ListaFichasTecnicas_EditarLocal() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[4]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);

        WebElement descricao = driver.findElement(By.name("site_description"));
        descricao.clear();
        descricao.sendKeys("Este conjunto de peças foi acondicionado em caixotes de madeira de pinho com palha, num edifício sem controlo ambiental. Presume-se que quente e seco no verão e frio e húmido no Inverno (Condeixa, Portugal).\n" +
"Julga-se que o chão onde os caixotes estavam colocados seria em terra batida.");
        
          driver.findElement(By.name("cold_temp")).sendKeys("5");
          driver.findElement(By.name("hot_temp")).sendKeys("20");
          driver.findElement(By.name("cold_humidity")).sendKeys("3");
        driver.findElement(By.name("hot_humidity")).sendKeys("15");
          Select start = new Select(driver.findElement(By.name("cold_start")));
        start.selectByValue("4");
        Thread.sleep(1000);
         Select end = new Select(driver.findElement(By.name("cold_end")));
        end.selectByValue("11");
        Thread.sleep(1000);
        
           WebElement Tipo = driver.findElement(By.name("lightning_type_natural"));
           Tipo.clear();
           Tipo.sendKeys("Natural");
        
           WebElement iluminancia = driver.findElement(By.name("natural_lux"));
           iluminancia.clear();
           iluminancia.sendKeys("5");
           
          WebElement uv = driver.findElement(By.name("natural_uv"));
           uv.clear();
           uv.sendKeys("2");
           
          WebElement real = driver.findElement(By.name("natural_real_uv"));
           real.clear();
           real.sendKeys("1");
           
           WebElement tipoArtificial = driver.findElement(By.name("lightning_origin_artificial"));
           tipoArtificial.clear();
           tipoArtificial.sendKeys("   ");
           
          WebElement iluminanciaArtificial = driver.findElement(By.name("artificial_lux"));
           iluminanciaArtificial.clear();
           iluminanciaArtificial.sendKeys("   ");
           
           WebElement uvArtificial = driver.findElement(By.name("artificial_uv"));
           uvArtificial.clear();
           uvArtificial.sendKeys("   ");
           
           WebElement realArtificial = driver.findElement(By.name("artificial_real_uv"));
           realArtificial.clear();
           realArtificial.sendKeys("   ");
           
                    
           WebElement agentes = driver.findElement(By.name("poluting_agents"));
           agentes.clear();
           agentes.sendKeys("Na Igreja: deposição de poeiras, fuligem e gorduras de parafinas de fumos das velas e incenso. Nos caixotes de madeira: degradação da palha e libertação de gases voláteis.");
           
           
           WebElement origem = driver.findElement(By.name("poluting_sources"));
           origem.clear();
           origem.sendKeys("Microclima do acondicionamento, afeto à palha e madeira, e do ambiente litúrgico onde se inseria (capela privada em Lisboa); Condições ambientais regionais.");
           
            WebElement resultados = driver.findElement(By.name("poluting_results"));
           resultados.clear();
           resultados.sendKeys("Ao nível da estrutura: fendas e fissuras; alterações nos adesivos – desidratação do grude;");
           
            WebElement observacoes = driver.findElement(By.name("env_conclusions"));
           observacoes.clear();
           observacoes.sendKeys("Apesar de não serem conhecidos os valores de HR ou T do local onde o retábulo foi armazenado, pode-se intuir que durante o período de 60 anos em que esteve em caixotes, esteve em ambientes altamente húmidos, inferidos pelo seu estado de conservação.\n" +
"Nomeadamente nas alterações significativas, observadas quer ao nível do suporte, quer do\n" +
"revestimento de superfície, e no surgimento de infestantes, que contribuíram para a deterioração.");
            Thread.sleep(1000);
            
            driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
            Thread.sleep(1000);
                   
          WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
}

      @After
    public void ListaFichasTecnicas_EditarExames() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[5]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);

         driver.findElement(By.name("testsQ1")).click();
         Thread.sleep(1000);
         
           driver.findElement(By.name("testsQ4")).click();
         Thread.sleep(1000);
         
                    
           WebElement resultados = driver.findElement(By.name("testsResults"));
           resultados.clear();
           resultados.sendKeys("Sem informação.");
         
           WebElement conclusoes = driver.findElement(By.name("testsConclusions"));
           conclusoes.clear();
           conclusoes.sendKeys("Os exames e análises realizados permitiram um melhor conhecimento técnico e material do objeto, dos agentes de deterioração, assim como dos materiais a empregar na intervenção.");
         
            WebElement enter = driver.findElement(By.name("searchBox"));
            enter.sendKeys("Geral");
           enter.sendKeys(Keys.ENTER); 
           Thread.sleep(1000);
           
           //Botao para adicionar exame
          
           driver.findElement(By.xpath("//*[@id=\"datasheet_part5\"]/app-datasheet-page5/button")).click();
           Thread.sleep(1000);
         
           //Adicionar EXAME formulario   
        driver.findElement(By.name("type_reference")).sendKeys("Testes de solubilidades e resistência");
         driver.findElement(By.name("location")).sendKeys("Pontual");
           driver.findElement(By.name("objectives")).sendKeys("Caracterização técnicas usadas");
        driver.findElement(By.name("results")).sendKeys("Positivos");
         
        Select resul = new Select (driver.findElement(By.name("technician")));
        resul.selectByValue("5");
         Thread.sleep(1000);
    
         driver.findElement(By.xpath("//*[@id=\"modal_tests\"]/div/div/form/div[3]/button[2]")).click();
         Thread.sleep(1000);
         
         //pop-up
          driver.switchTo().alert().accept();
         Thread.sleep(1000);
         
           WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
    }  
    
    
    
          @After
    public void ListaFichasTecnicas_EditarEstado() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[6]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
                     
           WebElement estrutura = driver.findElement(By.name("support_deterioration"));
           estrutura.clear();
           estrutura.sendKeys("Alteração física resultante de fatores biológicos- lacunas provocadas por infestação de insetos xilófagos;\n" +
"Alteração física resultante de fatores antrópicos?- fraturas provocadas por impacto;\n" +
"Alteração física- lacunas;\n" +
"Alterabilidade química- oxidação superficial;");
    
            WebElement superficie = driver.findElement(By.name("surface_deterioration"));
           superficie.clear();
           superficie.sendKeys("Sem Alteração física- falta de adesão com riscos de destacamentos; fissuras; fraturas; lacunas;.");
 
          WebElement elementos = driver.findElement(By.name("elements_diagnostic"));
           elementos.clear();
           elementos.sendKeys("s/d");
         
           WebElement conclusao = driver.findElement(By.name("conclusions_conservation"));
           conclusao.clear();
           conclusao.sendKeys("Sem No geral, estado de conservação razoável- apresenta uma infestação xilófaga latente geral, mais concentrada na base da coluna; apresenta uma rede de estalados geral nos estratos de superfície, mais concentrada na base da coluna, e nos locais onde o suporte é mais fino; várias lacunas de suporte e superfície; fraturas em vários locais do suporte e superfície.");
 
           driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
           Thread.sleep(1000);
           
           
           WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
           
    }
    
      @After
         public void ListaFichasTecnicas_EditarIntervencoes() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[7]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
    
           WebElement Estrutura = driver.findElement(By.name("support"));
           Estrutura.clear();
           Estrutura.sendKeys("Desinfestação com Cuprinol, recorrendo por via de infeção e a trinchas. Desinfestação, consolidações e colagens com cola branca.");
         
          WebElement superficie = driver.findElement(By.name("surface"));
           superficie.clear();
           superficie.sendKeys("Pré-fixação recorrendo ao PVA diluído em água, aplicação de cera resina aquecida com jacto de ar quente e limpezas superficiais.");
           
            WebElement elementos = driver.findElement(By.name("elements"));
           elementos.clear();
           elementos.sendKeys("Limpeza dos elementos vítreos com Paraloid B-72 em Xilol (40% - 60%).");
           
            WebElement conclusao = driver.findElement(By.name("conclusions_previous_interventions"));
           conclusao.clear();
           conclusao.sendKeys("Sem Observações");
         
            driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
           Thread.sleep(1000);
           
           
           WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
         }
         
         
    
          @After
         public void ListaFichasTecnicas_EditarProposta() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[8]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
     
         //checklist
        driver.findElement(By.name("owner_conserve")).click();
         Thread.sleep(1000);
         
           driver.findElement(By.name("owner_restaure")).click();
         Thread.sleep(1000);
                
            WebElement aspectos = driver.findElement(By.name("specific_aspects"));
           aspectos.clear();
           aspectos.sendKeys("Sem Possível restituir à peça os elementos metálicos com as contas de vidro em falta.");
         
          //checklist
        driver.findElement(By.name("prop_conserve")).click();
         Thread.sleep(1000);
         
           driver.findElement(By.name("prop_restaure")).click();
         Thread.sleep(1000);
           
           
           WebElement estrutura = driver.findElement(By.name("support_proposal"));
           estrutura.clear();
           estrutura.sendKeys("Desinfestação; consolidação; limpeza; preenchimento de lacunas. Colagens de algumas fendas; Reconstituição de elementos em falta (desde que haja referências para o fazer). Rever as ligações e encaixes (remoção de elementos metálicos).");
         
           
           WebElement recursos = driver.findElement(By.name("support_resources"));
           recursos.clear();
           recursos.sendKeys("A desinfestação seria realizada por imersão e/ou aplicação à trincha e/ou e a limpeza por via mecânica em alguns pontos de acordo com a sua necessidade.\n" +
"Colagem/fixação utilizando o PVA");
           
            WebElement superficie = driver.findElement(By.name("surface_proposal"));
           superficie.clear();
           superficie.sendKeys("   ");
           
          WebElement materiais = driver.findElement(By.name("surface_resources"));
           materiais.clear();
           materiais.sendKeys("Colocação de uma camada de proteção para estabilizar, um verniz aplicado à trincha com a obtenção de um tom brilhante.");
           
           
            WebElement acessorios = driver.findElement(By.name("elements_proposal"));
           acessorios.clear();
           acessorios.sendKeys("   ");
           
           WebElement recurso = driver.findElement(By.name("elements_resources"));
           recurso.clear();
           recurso.sendKeys("   ");
           
            WebElement conclusao = driver.findElement(By.name("observations"));
           conclusao.clear();
           conclusao.sendKeys("Apresentação de um plano de monitorização e controlo ambiental, de um espaço isolado, onde o conjunto retabular pudesse ser colocado, assim que fosse finalizada a intervenção.");
           
            Select ipt = new Select (driver.findElement(By.name("ipt_intervinient")));
        ipt.selectByValue("5");
         Thread.sleep(1000);
      
         driver.findElement(By.name("proposal_date")).sendKeys("20062019");
         
         Select cliente = new Select (driver.findElement(By.name("client_intervinient")));
        cliente.selectByValue("2");
         Thread.sleep(1000);
                  
           driver.findElement(By.name("acceptation_date")).sendKeys("24062019");
           
           driver.findElement(By.xpath("//*[@id=\"datasheet_part8\"]/app-datasheet-page8/fieldset[4]/div[3]/div/button")).click();
            Thread.sleep(1000);
      /*   //Erro no contacto 
        //Contacto
        WebElement nome_contacto = driver.findElement(By.name("contact_name"));
        nome_contacto.clear();
        nome_contacto.sendKeys("Teste");
         WebElement email_contacto = driver.findElement(By.name("contact_email"));
         email_contacto.clear();
         email_contacto.sendKeys("aluno10@ipt.pt");
         WebElement morada_contacto = driver.findElement(By.name("contact_address"));
         morada_contacto.clear();
         morada_contacto.sendKeys("Rua pt ");
         WebElement telemovel_contacto = driver.findElement(By.name("contact_phone"));
         telemovel_contacto.clear();
         telemovel_contacto.sendKeys("920500226");
         
        driver.findElement(By.xpath("//*[@id=\"modal_contacts2\"]/div/div/form/div[3]/button[2]")).click();
        Thread.sleep(1000);
        
        
           WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
  */
         } 
          @After
         public void ListaFichasTecnicas_EditarIntervencao() throws Exception{
        
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
         //seleciona o teste
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div/div/div[1]")).click();
        Thread.sleep(1000);
                driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[9]/a")).click();
        Thread.sleep(1000);
        //botao do editar
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button")).click();
        Thread.sleep(1000);
        //Esconder o navbar
               driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
     
         
           WebElement estrutura = driver.findElement(By.name("support_intervention"));
           estrutura.clear();
           estrutura.sendKeys("Retificação do posicionamento das peças constituintes dos frisos com meia esquadria colada, ligações simples de topo (cavilha), pregadas ao entablamento. Consolidação; Colagem realizada com aplicação de PVA com recurso a trinchas de maior e menor dimensões. De modo a garantir uma boa estabilidade e para uma melhor pressão colocaram-se apertos (grampos); recorreu-se ao berbequim para as furações, e, colocação das cavilhas para garantir que as peças ficassem fixas à estrutura e corte das mesmas. Nivelamento das superfícies com auxílio de formões da estrutura para fixar as peças. Em espaços de lacuna colocou-se uma faixa de madeira de pinho.");
        
           WebElement recursos = driver.findElement(By.name("support_resources_intervention"));
           recursos.clear();
           recursos.sendKeys("perfilómetro; formões; Cola PVA; Trinchas; berbequim (brocas: 6,8,10 mm); faia evaporizada (6,8,10 mm); faixa de madeira de pinho; papel abrasivo (nivelamento das cavilhas para uma melhor penetração da cola); tacos de madeira (auxilio nos apertos); grampos (utilização de borrachas para não danificar o entalhamento); maço; pano molhado (remoção do excesso de cola); Serrote de precisão; Serra circular de cortes transversais e de meia esquadria de bancada; nível; esquadro; alicate.");
           
           WebElement superficie = driver.findElement(By.name("elements_intervention"));
           superficie.clear();
           superficie.sendKeys("Procedeu-se à remoção de excesso das cavilhas com o formão para realizar o entalhe. Remoção da camada de preparação branca, onde se apresentava degrada; limpeza da superfície, colagens, fixação de destacamentos de ouro, limpeza, e remoção alguns de elementos metálicos.");
           
           WebElement recurso = driver.findElement(By.name("elements_resources_intervention"));
           recurso.clear();
           recurso.sendKeys("   ");
           
            WebElement conclusao = driver.findElement(By.name("observations_intervention"));
           conclusao.clear();
           conclusao.sendKeys("Sem conclusões");
           
            driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
           Thread.sleep(1000);
           
           
           WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[2]/div/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
           
         }
         
}