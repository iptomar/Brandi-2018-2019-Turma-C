/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
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

        driver.get("http://localhost:8080/#/");
        //driver.get("http://brandic.devll.eu:61080/");
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
    public void ListaFichasTecnicas_procurar_EditarErro() throws Exception {
        driver.get("http://localhost:8080/#/");
     //   driver.get("http://brandic.devll.eu:61080/");
      //  driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div[2]/div/div")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[2]/a")).click();
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
        owner.selectByValue("8");
         Thread.sleep(1000);
         
        Select patron = new Select (driver.findElement(By.name("patron")));
        patron.selectByValue("6");
         Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"datasheet_part2\"]/app-datasheet-page2/div[5]/div[2]/button")).click();
     
         WebElement nome = driver.findElement(By.name("contact_name"));
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
        
       WebElement msg = driver.findElement(By.className("alert-warning"));
           if (!msg.isDisplayed())
           fail("not save");
    }
   
  
    
    @Test
    public void ListaFichasTecnicas_procurar_Editarcorreto() throws Exception {
        driver.get("http://localhost:8080/#/");
       // driver.get("http://brandic.devll.eu:61080/");
   //     driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div[2]/div/div")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[2]/a")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
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
        owner.selectByValue("8");
         Thread.sleep(1000);
         
        Select patron = new Select (driver.findElement(By.name("patron")));
        patron.selectByValue("6");
         Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"datasheet_part2\"]/app-datasheet-page2/div[5]/div[2]/button")).click();
     
        WebElement nome = driver.findElement(By.name("contact_name"));
        nome.clear();
        nome.sendKeys("Fr1e");
         WebElement email = driver.findElement(By.name("contact_email"));
         email.clear();
         email.sendKeys("aluno12000@ipt.pt");
         WebElement morada = driver.findElement(By.name("contact_address"));
         morada.clear();
         morada.sendKeys("Rua Coim121bra shopping ");
         WebElement telemovel = driver.findElement(By.name("contact_phone"));
         telemovel.clear();
         telemovel.sendKeys("920561226");
         
        driver.findElement(By.xpath("//*[@id=\"modal_contacts\"]/div/div/form/div[3]/button[2]")).click();
        Thread.sleep(1000);

                    
       WebElement msg = driver.findElement(By.xpath("//*[@id=\"modal_contacts\"]/div/div/form/div[2]/div[1]"));
           if (!msg.isDisplayed())
           fail("not save");
        
  
}
    
    
    @Test 
    public void ListaFichasTecnicas_EditarCaracteristicas() throws Exception{
        driver.get("http://localhost:8080/#/");
      //  driver.get("http://brandic.devll.eu:61080/");
        //     driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[2]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("teste");
                driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/form/div/div/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div[2]/div/div")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[3]/a")).click();
        Thread.sleep(1000);
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
}

