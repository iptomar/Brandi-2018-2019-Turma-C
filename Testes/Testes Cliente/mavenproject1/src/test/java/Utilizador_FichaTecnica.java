/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

/**
 *
 * @author LittleChinese
 */
public class Utilizador_FichaTecnica {

    WebDriver driver;

    @Before

    public void home() throws Exception {
        driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);

        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
        Thread.sleep(1000);

        driver.findElement(By.name("email")).sendKeys("teste123456@ipt.pt");
        driver.findElement(By.name("password")).sendKeys("123456");

        driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();
        Thread.sleep(1000);

    }

    @Test
    public void Utilizador_FichaTecnica_Registar() throws Exception {

        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("design")).sendKeys("Objeto");
        driver.findElement(By.name("CEARC")).sendKeys("15633");
        driver.findElement(By.name("CEARCdate")).sendKeys("123456789");
        driver.findElement(By.name("CEARCentrydate")).sendKeys("12052018");
        driver.findElement(By.name("LCRM")).sendKeys("20052018");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[3]/div[2]/div/input")).sendKeys("22052018");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[3]/div[3]/div/input")).sendKeys("24052018");
        driver.findElement(By.name("coordinator")).click();
        Thread.sleep(1000);
        Select select = new Select(driver.findElement(By.name("supercategory")));
        select.selectByValue("1");
        Thread.sleep(1000);
        Select categ = new Select(driver.findElement(By.name("category")));
        categ.selectByValue("8");
        Thread.sleep(1000);
        Select sub = new Select(driver.findElement(By.name("subcategory")));
        sub.selectByValue("13");
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[7]/button")).click();
        Thread.sleep(1000);

    }

    @Test
    public void Utilizador_FichaTecnica_Registar_Incompleto() throws Exception {

        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("//*[@id=\"navbarDropdownDatasheet\"]")).click();
        Thread.sleep(1000);
        //driver.findElement(By.linkText("/admin/user/register")).click();
        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/div/a[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("design")).sendKeys("Objeto");
        driver.findElement(By.name("CEARC")).sendKeys("15633");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[3]/div[2]/div/input")).sendKeys("22052018");
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[3]/div[3]/div/input")).sendKeys("24052018");
        driver.findElement(By.name("coordinator")).click();
        Select select = new Select(driver.findElement(By.name("supercategory")));
        select.selectByValue("1");
        Thread.sleep(1000);
        driver.findElement(By.name("category")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("subcategory")).click();
        driver.findElement(By.xpath("/html/body/app-root/div/app-datasheet-create/div/div/form/div[7]/button")).click();
        Thread.sleep(1000);

    }
}
