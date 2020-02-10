package root.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "sciwork_table")
public class EnterDataForSciWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    String title;

    @Column(name = "name_coauthor")
    String name_coauthor;

    @Column(name = "key_term")
    String key_term;

    @Column(name = "abstract")
    String abstract1;

    @Column(name = "scientific_area")
    String scientific_area;

    @Column(name = "pdf")
    String pdf;

    @Column(name = "magazine_name")
    String magazine_name;


    public EnterDataForSciWork(String name, String name_coauthor, String key_term, String abstract1,String scientific_area,String pdf, String magazine_name) {
        this.title = name;
        this.name_coauthor = name_coauthor;
        this.key_term = key_term;
        this.abstract1 = abstract1;
        this.scientific_area=scientific_area;
        this.pdf=pdf;
        this.magazine_name=magazine_name;
    }

    public EnterDataForSciWork() {
    }
}
