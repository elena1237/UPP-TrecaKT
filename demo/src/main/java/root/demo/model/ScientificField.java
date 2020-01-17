package root.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "scientific_field_table")
public class ScientificField implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;
    @Column(name = "name")
    private String name;

    public ScientificField(String name) {
        this.name = name;
    }

    public ScientificField() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
