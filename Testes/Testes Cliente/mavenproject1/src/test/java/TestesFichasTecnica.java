/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Ricardo
 */
public class TestesFichasTecnica {

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("http://brandic.devll.eu:61080/#/datasheet/create");
        //Designação do objeto
        WebElement design = driver.findElement(By.name("design"));
        design.sendKeys("Peça XXXX qualquer coisa - :D");
        //Numero do processo CEARC
        WebElement cearc = driver.findElement(By.name("CEARC"));
        cearc.sendKeys("321321321");
        
        //CEARC data
        WebElement cearcDate = driver.findElement(By.name("CEARCdate"));
        //Preencher data como dd/mm/yyyy para 09/02/2019
        cearcDate.sendKeys("922019");
       
        //CEARC data entrada
        WebElement cearCentryDate = driver.findElement(By.name("CEARCentryDate"));
        //Preencher data como dd/mm/yyyy para 09/02/2019
        cearCentryDate.sendKeys("922019");
       
       //Numero do processo LCMR
       WebElement lcmr = driver.findElement(By.name("LCRM"));
       lcmr.sendKeys("12158");
       
       //LCRM data
        WebElement lcrmDate = driver.findElement(By.name("LCRMdate"));
        //Preencher data como dd/mm/yyyy para 09/02/2019
        lcrmDate.sendKeys("922019");
        
        //LCRM data entrada
        WebElement lcrmEntryDate = driver.findElement(By.name("LCRMCentryDate"));
        //Preencher data como dd/mm/yyyy para 09/02/2019
        lcrmEntryDate.sendKeys("922019");
        
        //RADIO BUTTON
        WebElement coordinator = driver.findElement(By.name("coordinator"));
        coordinator.sendKeys(Keys.DOWN);
        coordinator.sendKeys(Keys.RETURN);


        driver.findElement(By.name("submit")).click();
        // driver.close();
    }

    @Test
    public void testSimple() throws Exception {
        WebDriver driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/signup/signup");

        /*JAVASCRIPT   
          JavascriptExecutor js = (JavascriptExecutor)driver;
          
          js.executeScript("alert(2+2);");
         */
        WebElement email = driver.findElement(By.id("email")); //.sendKeys("teste123456@ipt.pt");
        email.clear();
        email.sendKeys("teste123456@ipt.pt");

        WebElement fullname = driver.findElement(By.id("fullname"));
        fullname.clear();
        fullname.sendKeys("Manuel Mircolino dos Santos");

        WebElement password = driver.findElement(By.id(("password")));
        password.clear();
        password.sendKeys("WebElem");

        WebElement data = driver.findElement(By.id("dateCamp"));
        data.clear();
        data.sendKeys("10102000");

        WebElement address = driver.findElement(By.id("address"));
        address.clear();
        address.sendKeys("No Coracao de todo o verdadeiro portugues");

        WebElement cellphone = driver.findElement(By.id("cellphone"));
        cellphone.clear();
        cellphone.sendKeys("912312321");

        driver.findElement(By.id("usertypeid")).click();
        Thread.sleep(1000);
        data.sendKeys("a");

        driver.findElement(By.id("cellphone")).click();
        Thread.sleep(1000);

        driver.findElement(By.id("registar")).click();

        // TODO add test methods here.
        // The methods must be annotated with annotation @Test. For example:
        //
        // @Test
        // public void hello() {}
    }
}