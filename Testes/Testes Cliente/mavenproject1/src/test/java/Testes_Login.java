
import static org.junit.Assert.fail;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 *
 * @author LittleChinese
 */

//IMPORTANTE teste123456@ipt.pt PASS:123456
public class Testes_Login {
    
  @BeforeClass
  public static void setUpBeforeClass() throws Exception {}

  @AfterClass
  public static void tearDownAfterClass() throws Exception {}

  @Before
  public void setUp() throws Exception {}

  @After
  public void tearDown() throws Exception {}
  
    @Test
    public void testSimple() throws Exception {
    
        WebDriver driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/login/login");
        
       driver.findElement(By.id("email")).sendKeys("teste123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456");
       driver.findElement(By.id("butLogin")).click();
       
       String str = driver.findElement(By.id("mensagem")).getText();
        if("Autenticado com sucesso".equals(str))
           fail();
        //driver.quit();
    
    
}
    
    
  //  @Ignore @Test
    @Test
    public void autenticadorJaAutenticado() throws Exception{
        WebDriver driver = new ChromeDriver();
        
         driver.get("http://brandic.devll.eu:61080/login/login");
          driver.findElement(By.id("email")).sendKeys("teste123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456");
       driver.findElement(By.id("butLogin")).click();
 
     Thread.sleep(3000);
        driver.findElement(By.id("butLogin")).click();
        String str = driver.findElement(By.id("mensagem")).getText();
      if(("Utilizador já se encontra autenticado").equals(str));
         
    
}
    @Test
    public void emailfalhado() throws Exception{
         WebDriver driver = new ChromeDriver();
        
         driver.get("http://brandic.devll.eu:61080/login/login");
                driver.findElement(By.id("email")).sendKeys("testes123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456");
       driver.findElement(By.id("butLogin")).click();
       
       String str = driver.findElement(By.id("mensagem")).getText();
        if("Autenticado com sucesso".equals(str))
            fail();
    }
         
    
        @Test
    public void passworderrada() throws Exception{
         WebDriver driver = new ChromeDriver();
        
         driver.get("http://brandic.devll.eu:61080/login/login");
                driver.findElement(By.id("email")).sendKeys("teste123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456789");
       driver.findElement(By.id("butLogin")).click();
       
       String str = driver.findElement(By.id("mensagem")).getText();
        if("Autenticado com sucesso".equals(str))
            fail();
    
}
    
       @Test
    public void autenticacaofalhada() throws Exception{
         WebDriver driver = new ChromeDriver();
        
         driver.get("http://brandic.devll.eu:61080/login/login");
                driver.findElement(By.id("email")).sendKeys("testes123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456789");
       driver.findElement(By.id("butLogin")).click();
       
       String str = driver.findElement(By.id("mensagem")).getText();
        if("Autenticado com sucesso".equals(str))
            fail();
    
  
    }
}
/*  String str = driver.findElement(By.id("mensagem")).getText();
       if("Autenticado com sucesso".equals(str))
           fail();
*/

/*    public void testSimple() throws Exception {
        // Create a new instance of the Firefox driver
        // Notice that the remainder of the code relies on the interface, 
        // not the implementation.
        WebDriver driver = new ChromeDriver();

        // And now use this to visit NetBeans
        driver.get("http://www.netbeans.org");
        // Alternatively the same thing can be done like this
        // driver.navigate().to("http://www.netbeans.org");

        // Check the title of the page
        // Wait for the page to load, timeout after 10 seconds
        (new WebDriverWait(driver, 10)).until(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver d) {
                return d.getTitle().contains("NetBeas");
            }
        });

        //Close the browser
        driver.quit();
*/


/*    @Test
    public void autenticadorJáAutenticado() throws Exception{
        WebDriver driver = new ChromeDriver();
        
         driver.get("http://brandic.devll.eu:61080/login/login");
          driver.findElement(By.id("email")).sendKeys("teste123456@ipt.pt"); 
       driver.findElement(By.id("password")).sendKeys("123456");
       driver.findElement(By.id("butLogin")).click();
         Thread.sleep(3000);
        driver.findElement(By.id("butLogin")).click();
        String str = driver.findElement(By.id("mensagem")).getText();
      if(("Utilizador já se encontra autenticado").equals(str));
         fail();
         */