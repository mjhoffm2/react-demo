using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Demo.Models.Database
{
    public partial class User
    {
        public User()
        {
            Channel = new HashSet<Channel>();
            Message = new HashSet<Message>();
            UserChannel = new HashSet<UserChannel>();
        }

        public long UserId { get; set; }
        [Required]
        [StringLength(200)]
        public string Username { get; set; }
        [StringLength(200)]
        public string DisplayName { get; set; }
        [StringLength(200)]
        public string Email { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public bool IsSoftDeleted { get; set; }

        [InverseProperty("Owner")]
        public ICollection<Channel> Channel { get; set; }
        [InverseProperty("User")]
        public ICollection<Message> Message { get; set; }
        [InverseProperty("User")]
        public ICollection<UserChannel> UserChannel { get; set; }
    }
}
