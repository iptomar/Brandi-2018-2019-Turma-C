
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author Ricardo
 */
public class TesteFichaTecnicaAdmin_Search {

    WebDriver driver;

    @Before
    public void home() throws Exception {
        driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);

        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
        Thread.sleep(1000);

        driver.findElement(By.name("email")).sendKeys("asd@web.com");
        driver.findElement(By.name("password")).sendKeys("asd");

        driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();
        Thread.sleep(1000);

    }

    @Test
    public void ListaFichasTecnicas_procurar() throws Exception {

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
        driver.findElement(By.xpath("//*[@id=\"datasheet-tabs\"]/li[5]/a")).click();
        Thread.sleep(1000);
     
    }
    
    /*
          @BeforeClass
    public static void setUpBeforeClass() throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("http://brandic.devll.eu:61080/#/datasheet/create");
        //Designação do objeto
        WebElement searchBox = driver.findElement(By.name("searchBox"));
        searchBox.sendKeys("Ola Mundo");
        searchBox.sendKeys(Keys.ENTER);
        
        WebElement divInfo = driver.findElement(By.className("card-title"));
        divInfo.click();
        // driver.close();
    }
    */

}