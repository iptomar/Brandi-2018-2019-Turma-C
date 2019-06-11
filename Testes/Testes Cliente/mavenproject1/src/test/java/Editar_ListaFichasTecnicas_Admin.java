/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

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
    public void ListaFichasTecnicas_procurar_Editar() throws Exception {

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
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet/div/div/div/div[2]/div/div")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[2]/a")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-edit/form/div[1]/div/div[2]/div/button[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("dimensions")).sendKeys("2x3x2");
        driver.findElement(By.name("other_dimensions")).sendKeys("1x1x1");
        driver.findElement(By.name("tipology")).sendKeys("teste");
        driver.findElement(By.name("site")).sendKeys("Local");
        Select prop = new Select (driver.findElement(By.name("owner")));
        prop.selectByValue("2");
         Thread.sleep(1000);
                
        Select owner = new Select (driver.findElement(By.name("object_owner")));
        owner.selectByValue("5");
         Thread.sleep(1000);
         
        Select patron = new Select (driver.findElement(By.name("patron")));
        patron.selectByValue("1");
         Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"datasheet_part2\"]/app-datasheet-page2/div[5]/div[2]/button")).click();
        
        
        //bug o teste vai falhar
       WebElement msg = driver.findElement(By.className("alert-sucess"));
       assertEquals("Ficha técnica atualizada com sucesso",msg.getText());
    }
}
